const express = require('express');
const router = express.Router();
const well = require('./well');

router.get('/', (req, res) => {
    res.json({kakka: true})
});

router.get('/measured', (req, res) => {
    const start = req.param(start) || Date.now() - 24 * 60 * 60 * 1000;
    const end = req.param(end) || Date.now();
    const offset = req.param(offset) || 0;
    const limit = req.param(limit) || 100;

console.log(start, end, offset, limit);

    well.timeSpan(start, end, offset, limit).then((response) => {
        res.status(200)
            .json(response);
    });    
});

module.exports = router;