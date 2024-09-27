const express = require('express');

const DbDataAccess = require('./dao/dbDataAccess');
const MQTTClient = require('./MQTTClient');

const app = express();
const port = 3000;

const mqttServer = 'mqtt://192.168.1.78:1883';
new MQTTClient(mqttServer);

app.get('/data', (req, res) => {
    const { from, to } = req.query;

    if (from && to) {
        res.send(DbDataAccess.getWaterFlowData(from, to));
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
