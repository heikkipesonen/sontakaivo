const Sequelize = require('sequelize');
const db = new Sequelize('shitwell', 'root', 'kissakala', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

module.exports = db;