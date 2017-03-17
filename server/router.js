const express = require('express');
const router = express.Router();
const well = require('./well');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/well', (req, res) => {
    const start = new Date( Date.now() - 24 * 60 * 60 * 1000 );
    const end = new Date();
    well.timeSpan(start, end).then((response) => {
        res.status(200)
            .json(response);
    });    
});

module.exports = router;