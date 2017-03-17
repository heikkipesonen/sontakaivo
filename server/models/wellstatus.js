const Sequelize = require('sequelize');
const db = require('../db');

const wellStatus = db.define('wellstatus', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    set (value) {
      this.setDataValue(new Date(value));
    },
    get () {
      return this.getDataValue().valueOf();
    }
  },  
  endTime: {
    type: Sequelize.DATE,
    set (value) {
      this.setDataValue(new Date(value));
    },
    get () {
      return this.getDataValue().valueOf();
    }
  },  
});

module.exports = wellStatus;