from sources.db import save_sensor_data_to_db
from sources.sensor_bme680 import initialize_bme680, get_bme680_data
from sources.sensor_gpio import initialize_gpio, get_gpio_sensor_state
import time

config = {
    "interval": 300,
    "gpio_pin": 22
}

# Read BME680 sensor data and save to database
def save_bme680_data(sensor):
    data = get_bme680_data(sensor)
    if data:
        print(f"Sensor data: {data}")
        save_sensor_data_to_db('voc_sensor_data', data)  

# Read GPIO sensor state and save to database
def save_gpio_data(): 
    sensor_state = get_gpio_sensor_state(config['gpio_pin'])
    data = {
        'motion': sensor_state
    }
    print(f"GPIO Sensor data: {data}")
    save_sensor_data_to_db('radar_sensor_data', data)

# Main loop to read sensor data and save to database at regular intervals
def loop(bme680_sensor):
    print(f"Starting sensor loop, interval={config['interval']}s")

    try:
        while True:
            save_bme680_data(bme680_sensor)
            save_gpio_data()

            time.sleep(config['interval'])

    except KeyboardInterrupt:
        print('Interrupted by user — shutting down')

    finally:
        try:
            print('Shutting down sensor loop')
        except Exception:
            pass

# Main entry point
def main():
    bme680_sensor = initialize_bme680()
    initialize_gpio(config['gpio_pin'])
    loop(bme680_sensor)

main()
