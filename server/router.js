const express = require('express');
const router = express.Router();
const meter = require('./meter');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

meter.start();
meter.on('data', () => {
    console.log(meter.data);
})

router.get('/meter', (req, res) => {
    res.status(200)
        .json(meter.data);
});

module.exports = router;