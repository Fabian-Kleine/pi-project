#!/usr/bin/env python3
"""
Read the BME680 sensor every N seconds and insert the readings into the
`test` table in MySQL using the existing `db_config.DB_CONFIG`.

This script is safe to run on a machine without the BME680 library/hardware —
it will produce simulated values in that case.
"""

import sys
import os
import time
import argparse
import logging

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import mysql.connector
from db_config import DB_CONFIG

try:
    import bme680
    HAS_SENSOR = True
except Exception:
    HAS_SENSOR = False


def init_sensor():
    """Initialize BME680 sensor or return None if unavailable."""
    if not HAS_SENSOR:
        return None
    try:
        sensor = bme680.BME680(bme680.I2C_ADDR_PRIMARY)
    except (RuntimeError, IOError):
        sensor = bme680.BME680(bme680.I2C_ADDR_SECONDARY)

    # sensible defaults similar to the project's example
    sensor.set_humidity_oversample(bme680.OS_2X)
    sensor.set_pressure_oversample(bme680.OS_4X)
    sensor.set_temperature_oversample(bme680.OS_8X)
    sensor.set_filter(bme680.FILTER_SIZE_3)
    sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)
    sensor.set_gas_heater_temperature(320)
    sensor.set_gas_heater_duration(150)
    sensor.select_gas_heater_profile(0)

    return sensor


def read_sensor(sensor):
    """Return a 4-tuple of formatted strings (temperature, pressure, humidity, gas).

    If the hardware/library isn't available this returns simulated random values.
    """
    if sensor is None:
        # simulated values for environments without hardware
        import random
        t = round(20.0 + random.uniform(-3.0, 3.0), 2)
        p = round(1013.0 + random.uniform(-8.0, 8.0), 2)
        h = round(50.0 + random.uniform(-20.0, 20.0), 2)
        g = round(1000.0 + random.uniform(-400.0, 400.0), 2)
        return (f"{t} C", f"{p} hPa", f"{h} %", f"{g} Ohm")

    # real sensor read
    if not sensor.get_sensor_data():
        return None

    temp = f"{sensor.data.temperature:.2f} C"
    pres = f"{sensor.data.pressure:.2f} hPa"
    hum = f"{sensor.data.humidity:.2f} %"
    gas = f"{sensor.data.gas_resistance:.2f} Ohm" if sensor.data.heat_stable else "N/A"
    return (temp, pres, hum, gas)


def main(interval_seconds: int):
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
    sensor = init_sensor()
    if not HAS_SENSOR:
        logging.warning('bme680 library/hardware not available — using simulated sensor values')

    # Connect to MySQL
    try:
        conn = mysql.connector.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            database=DB_CONFIG['database'],
            port=DB_CONFIG.get('port', 3306),
        )
    except mysql.connector.Error as e:
        logging.error(f'Failed to connect to MySQL: {e}')
        raise SystemExit(1)

    cursor = conn.cursor()

    # Ensure table exists (safe no-op if it already does)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS test (
        id INT AUTO_INCREMENT PRIMARY KEY,
        temperature VARCHAR(20),
        air_pressure VARCHAR(20),
        relative_humidity VARCHAR(20),
        gas_resistance VARCHAR(20)
    )
    """)

    insert_sql = ("INSERT INTO test "
                  "(temperature, air_pressure, relative_humidity, gas_resistance) "
                  "VALUES (%s, %s, %s, %s)")

    logging.info(f"Starting sensor loop, interval={interval_seconds}s")

    try:
        while True:
            values = read_sensor(sensor)
            if values is None:
                logging.warning('No sensor data available this iteration')
            else:
                cursor.execute(insert_sql, values)
                conn.commit()
                logging.info(f"Inserted sensor reading: {values}")

            time.sleep(interval_seconds)

    except KeyboardInterrupt:
        logging.info('Interrupted by user — shutting down')

    finally:
        try:
            cursor.close()
            conn.close()
            logging.info('Database connection closed')
        except Exception:
            pass


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Read BME680 and insert into MySQL every N seconds')
    parser.add_argument('--interval', '-i', type=int, default=30, help='Sampling interval in seconds (default: 30)')
    args = parser.parse_args()
    main(args.interval)
