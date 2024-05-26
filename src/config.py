from machine import Pin, ADC


class Pins:
    SENSOR_READ_PIN = ADC(0)  # A0

    LED_WIFI_CONNECTED = Pin(2, Pin.OUT)  # Built-in LED
    LED_DATA_READ = Pin(5, Pin.OUT)  # D1
    LED_WEB_SERVER = Pin(12, Pin.OUT)  # D6

    PUMP = Pin(0, Pin.OUT)  # D3


FREQ = 10  # Run per second

# Default state
Pins.LED_WIFI_CONNECTED.on()  # Turn off LED (active: LOW)
Pins.LED_DATA_READ.off()
Pins.LED_WEB_SERVER.off()
Pins.PUMP.off()
