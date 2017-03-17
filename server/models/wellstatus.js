const Sequelize = require('sequelize');
const db = require('../db');

const wellStatus = db.define('wellstatus', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  }  
});

module.exports = wellStatus;