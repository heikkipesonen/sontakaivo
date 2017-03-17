const meter = require('./meter');
const db = require('./db');
const wellStatus = require('./models/wellstatus');

meter.start();
meter.on('data', () => {
  wellStatus.create({
    startTime: data.startTime,
    endTime: data.endTime,
    value: data.value
  });

  console.log(meter.data);
})

const well = {

}

module.exports = well;