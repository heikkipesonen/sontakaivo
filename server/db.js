const Sequelize = require('sequelize');
const db = new Sequelize('shitwell', 'shitwell', 'kaivo', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
});

module.exports = db;