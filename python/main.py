from sources.db import save_sensor_data_to_db
from sources.sensor_bme680 import initialize_bme680, get_bme680_data
import time

config = {
    "interval": 300
}

def loop(bme680_sensor):
    print(f"Starting sensor loop, interval={config['interval']}s")

    try:
        while True:
            data = get_bme680_data(bme680_sensor)
            if data:
                print(f"Sensor data: {data}")
                save_sensor_data_to_db('voc_sensor_data', data)

            time.sleep(config['interval'])

    except KeyboardInterrupt:
        print('Interrupted by user — shutting down')

    finally:
        try:
            print('Shutting down sensor loop')
        except Exception:
            pass

def main():
    bme680_sensor = initialize_bme680()
    loop(bme680_sensor)

main()
