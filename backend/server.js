const express = require('express');
const cors = require('cors');

const DbDataAccess = require('./dao/dbDataAccess');
const MQTTClient = require('./MQTTClient');

const app = express();
const port = 3000;

const mqttServer = 'mqtt://192.168.1.78:1883';
new MQTTClient(mqttServer);

app.use(cors());

app.get('/getAll', (req, res) => {
    const { from, to } = req.query;

    if (from && to) {
        res.send(DbDataAccess.getWaterFlowData(from, to));
    }
});

app.get('/getByHours', (req, res) => {
    const { from, to } = req.query;

    if (from && to) {
        res.send(DbDataAccess.getWaterFlowDataByHours(from, to));
    }
});

app.get('/getByDays', (req, res) => {
    const { from, to } = req.query;

    if (from && to) {
        res.send(DbDataAccess.getWaterByDays(from, to));
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
