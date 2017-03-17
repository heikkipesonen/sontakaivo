const express = require('express');
const router = express.Router();
const meter = require('./meter');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/meter', (req, res) => {
    console.log('reading values');
    meter.readAverage().then((response) => {        
        res.status(200)
            .json(response);
    }, () => res.status(500))
});

module.exports = router;