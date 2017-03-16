const express = require('express');
const router = express.Router();
const meter = require('./meter');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/meter', (req, res) => {
    res.json({
        value: meter.value,
        timeStamp: meter.timeStamp
    });
});

module.exports = router;