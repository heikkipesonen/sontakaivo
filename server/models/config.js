const Sequelize = require('sequelize')
const db = require('../db')

const config = db.define('config', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = config
