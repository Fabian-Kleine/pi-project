import RPi.GPIO as GPIO

def initialize_gpio(pin: int):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pin, GPIO.IN)

def get_gpio_sensor_state(pin: int) -> bool:
    return GPIO.input(pin)