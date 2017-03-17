const Sequelize = require('sequelize');
const db = require('../db');

const wellStatus = db.define('wellstatus', {
  id: Sequelize.UUID,
  value: Sequelize.INTEGER,
  timeStamp: {
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