const mqtt = require('mqtt');

const DbDataAccess = require('./dao/dbDataAccess');

class MQTTClient {
    constructor(mqttServerAddress) {
        this.client = mqtt.connect(mqttServerAddress);
        this.topicName = 'esp8266/flow';

        this.init();
    }

    init() {
        this.connectHandler();
        this.errorHandler();
        this.messageHandler();
    }

    messageHandler() {
        this.client.on('message', (topic, message) => {
            if (topic === this.topicName) {
                const liters = 10;

                DbDataAccess.saveFlowData(liters);
            }
        });
    }

    connectHandler() {
        this.client.on('connect', () => {
            console.log('Connected to MQTT server');
            this.subscribeToTopic();
        });
    }

    errorHandler() {
        this.client.on('error', (err) => {
            console.error('Error:', err);
        });
    }

    subscribeToTopic() {
        this.client.subscribe(this.topicName, (err) => {
            if (err) {
                console.error('Failed to subscribe:', err);
            } else {
                console.log(`Subscribed to topic: ${this.topicName}`);
            }
        });
    }
}

module.exports = MQTTClient;
