const Sequelize = require('sequelize');
const db = require('../db');

const wellStatus = db.define('wellstatus', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true    
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  measuredAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: false  
});

module.exports = wellStatus;