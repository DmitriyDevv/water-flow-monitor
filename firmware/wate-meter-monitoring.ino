#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const int pin = 5; // D1
int pinState = 0;
const char* mqttServer = "192.168.1.78";
const char* topicName = "esp8266/flow"; 

const char* ssid = "Keenetic-2.4";
const char* pass = "9778992858Cc";

WiFiClient espClient;
PubSubClient client(espClient);

int isFlowTriggered = 0;

void setupWifi() {
    delay(1000);
    Serial.println("Connecting to WiFi");
    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    
    Serial.println("\nConnected to WiFi!");
}

void mqttReconnect() {
    if (!client.connected()) {
        Serial.print("Attempting MQTT connection... ");
        client.setServer(mqttServer, 1883);

        if (client.connect("ESP32Client")) {
            Serial.println("Connected");
        } else {
            Serial.print("Connect error: ");
            Serial.println(client.state());
            delay(5000);
        }
    }
}

void mqttConnectHandler() {
    if (!client.connected()) {
        mqttReconnect();
    }

    client.loop();
}

void sendMqttMessage() {
    const char* message = "Flow detected";
    if (client.publish(topicName, message)) {
        Serial.println("Message sent");
    } else {
        Serial.println("Message failed to send");
    } 
}

void setup() {
    Serial.begin(115200);
    setupWifi();
    pinMode(pin, INPUT);
}

void loop() {
    mqttConnectHandler();

    pinState = digitalRead(pin);

    if (pinState == 1) {
        isFlowTriggered = 1;  
    } else if (pinState == 0) {
        if (isFlowTriggered == 1) {
            sendMqttMessage();
            isFlowTriggered = 0;
            delay(50);
        }
    }
}
