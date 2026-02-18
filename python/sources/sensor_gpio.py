import RPi.GPIO as GPIO

# GPIO sensor initialization and data retrieval functions
def initialize_gpio(pin: int):
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pin, GPIO.IN)

# Function to get GPIO sensor state (e.g., motion detected or not)
def get_gpio_sensor_state(pin: int) -> bool:
    return GPIO.input(pin)