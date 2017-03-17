const express = require('express');
const router = express.Router();
const meter = require('./meter');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/meter', (req, res) => {
    console.log('reading values');
    meter.read().then((response) => {
        console.log('values read', response);
        res.json(200, response);
    }, () => {
        res.send(500);
    })
});

module.exports = router;