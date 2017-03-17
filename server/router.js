const express = require('express');
const router = express.Router();
const well = require('./well');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/measured', (req, res) => {
    const start = req.params.start || Date.now() - 24 * 60 * 60 * 1000;
    const end = req.params.end || Date.now();
    const offset = req.params.offset || 0;
    const limit = req.params.limit || 0;

    well.timeSpan(start, end, offset, limit).then((response) => {
        res.status(200)
            .json(response);
    });    
});

module.exports = router;