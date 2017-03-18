const config = require('./config')
const server = require('../server')

const configurator = {

  meter: {
    interval: 1000 * 60,
    controlPin: 12,
    averageValues: 50
  },

  well: {
    low: 550,
    high: 120
  },

  prediction: {
    duration: 7 * 24 * 60 * 60 * 1000
  },

  set (key, value) {
    config.create({
      key,
      value
    }).then(() => {

    })
  }
}

module.exports = configurator
