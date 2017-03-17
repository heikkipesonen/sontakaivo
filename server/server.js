const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const meter = require('./meter');

const fs = require('fs');
const db = require('./db');
const wellStatus = require('./models/wellstatus');

db.sync({
    // force: true
});

server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    const html = fs.readFileSync('index.html');
    html = html.replace('<!-- {{liveScript}} -->', '<script type="text/javascript" src="http://livejs.com/live.js"></script>');
    res.send(html);    
});

server.use('/api', router);

module.exports = server;