const config = require('./config');
const server = require('../server');

const configurator = {

  meter: {
    interval: 1000 * 60,
    controlPin: 12,
    averageValues: 50
  },

  set (key, value) {
    config.create({
      key,
      value
    }).then(() => {

    })
  }
}

module.exports = configurator;
