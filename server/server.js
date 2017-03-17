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

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    const html = fs.readFileSync('index.html');
    res.send(html);
});

server.use('/api', router);

module.exports = server;
