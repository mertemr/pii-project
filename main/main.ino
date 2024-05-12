#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include "./wifi-credentials.h"
#include "./config.h"

int *humanityData;
// char *server_uri = "192.168.1.101:10000";

void readData()
{
    digitalWrite(DATA_LED, HIGH);
    int val = analogRead(A0);
    val = map(val, 0, 1023, 0, 100);
    val = constrain(val, 0, 100);
    val = 100 - val;
    humanityData = val;
    delay(100);
    digitalWrite(DATA_LED, LOW);
}

void connectToWiFi()
{
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    Serial.println("");
    Serial.println("Connecting to " + String(WIFI_SSID) + " with password " + String(WIFI_PASS));
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(1000);
    }

    Serial.println("");
    Serial.println("Connected to WiFi");
    Serial.println("IP address: " + WiFi.localIP().toString());

    digitalWrite(WIFI_LED, LOW);
}

void setup()
{
    Serial.begin(9600);

    pinMode(WIFI_LED, OUTPUT);
    pinMode(SERVER_LED, OUTPUT);
    pinMode(DATA_LED, OUTPUT);

    pinMode(SENSOR_PIN, INPUT);

    digitalWrite(WIFI_LED, HIGH);

    connectToWiFi();
}

void loop()
{
    if (WiFi.status() == WL_CONNECTED) {
        readData();
        Serial.println("Humanity data: " + String(humanityData) + "%");
        // FIXME Send data to server not implemented yet
    } else {}

    delay(1000 / FREQ);
}