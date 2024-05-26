import machine
import network
import time

try:
    import usocket as socket
except ImportError:
    import socket

from config import FREQ, Pins
from wifi_creds import WIFI_SSID, WIFI_PASSWORD

machine.freq(160000000)  # 160 MHz (max)

def map_range(x, in_min, in_max, out_min, out_max):
  return (x - in_min) * (out_max - out_min) // (in_max - in_min) + out_min

def readData():
    Pins.LED_DATA_READ.on()
    val: int = Pins.SENSOR_READ_PIN.read()
    val = map_range(val, 0, 1023, 0, 100)
    val = 100 - val
    time.sleep(0.05)
    Pins.LED_DATA_READ.off()
    return val

def connectToWiFi():
    Pins.LED_WIFI_CONNECTED.on()
    
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.connect(WIFI_SSID, WIFI_PASSWORD)
    
    while not sta_if.isconnected():
        print(".", end="")
    
    print()
    print("Connected to WiFi:", WIFI_SSID)
    print("IP Address:", sta_if.ifconfig()[0])
        
    Pins.LED_WIFI_CONNECTED.off()  # Turn on LED (active: LOW)

def runPump():
    Pins.PUMP.on()
    print("Running pump...")
    time.sleep(5)
    Pins.PUMP.off()

def main():
    connectToWiFi()
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 80))
    s.listen(5)
    s.settimeout(0.5)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    while True:        
        val = readData()
        print("Moisture Level:", val, "%")
        
        try:
            conn, addr = s.accept()
            print("Got a connection from %s" % str(addr))
            Pins.LED_WEB_SERVER.on()
            data = conn.recv(1024)
            print("Data:\n", data)
            
            if b'{"run_pump":true}' in data:
                print("Forcing pump to run...")
                response = "HTTP/1.1 200 OK\r\n"
                response += "Content-Type: application/json\r\n"
                response += "Connection: close\r\n\r\n"
                response = response.encode()
                conn.sendall(response)
                conn.close()
                runPump()
                Pins.LED_WEB_SERVER.off()
                continue
            
            response = "HTTP/1.1 200 OK\r\n"
            response += "Content-Type: application/json\r\n"
            response += "Connection: close\r\n\r\n"
            response += "{\n"
            response += f"  \"moisture_level\": {val}\n"
            response += "}\n"
            response = response.encode()
            conn.sendall(response)
            conn.close()
            Pins.LED_WEB_SERVER.off()
        except OSError:
            pass
        
        if val < 20:
            runPump()
        
        time.sleep(0.1)

main()