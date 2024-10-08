#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoOTA.h>

const int pin = 5; // D1
const int debounceDelay = 100;
int pinState = 0;
int currentPinState = 0;
unsigned long lastDebounceTime = 0;
const char* mqttServer = "192.168.1.36";
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

        if (client.connect("ESP8266Client")) {
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

void setupOTA() {
    ArduinoOTA.setHostname("ESP8266-FlowMeter");

    ArduinoOTA.onStart([]() {
        String type;
        if (ArduinoOTA.getCommand() == U_FLASH) {
            type = "sketch";
        } else { // U_SPIFFS
            type = "filesystem";
        }
        Serial.println("Start updating " + type);
    });

    ArduinoOTA.onEnd([]() {
        Serial.println("\nEnd");
    });

    ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
        Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    });

    ArduinoOTA.onError([](ota_error_t error) {
        Serial.printf("Error[%u]: ", error);
        if (error == OTA_AUTH_ERROR) {
            Serial.println("Auth Failed");
        } else if (error == OTA_BEGIN_ERROR) {
            Serial.println("Begin Failed");
        } else if (error == OTA_CONNECT_ERROR) {
            Serial.println("Connect Failed");
        } else if (error == OTA_RECEIVE_ERROR) {
            Serial.println("Receive Failed");
        } else if (error == OTA_END_ERROR) {
            Serial.println("End Failed");
        }
    });

    ArduinoOTA.begin();
}

void setup() {
    Serial.begin(115200);
    setupWifi();
    pinMode(pin, INPUT);
    setupOTA();
}

void loop() {
    ArduinoOTA.handle();
    mqttConnectHandler();

    currentPinState = digitalRead(pin);

    if (currentPinState != pinState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (currentPinState == 1 && isFlowTriggered == 0) {
            isFlowTriggered = 1;
        } else if (currentPinState == 0 && isFlowTriggered == 1) {
            sendMqttMessage();
            isFlowTriggered = 0;
        }
    }

    pinState = currentPinState;
}
