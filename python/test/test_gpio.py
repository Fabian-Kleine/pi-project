import RPi.GPIO as GPIO
import time

SENSOR_PIN = 22  # Use the GPIO pin number you connect OUT to

GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)

print("RCWL-0516 Sensor Test (Press CTRL+C to exit)")
try:
    while True:
        if GPIO.input(SENSOR_PIN):
            print("Motion detected!")
        else:
            print("No motion.")
        time.sleep(1)
except KeyboardInterrupt:
    print("Test stopped by user.")
finally:
    GPIO.cleanup()