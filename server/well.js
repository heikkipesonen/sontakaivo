const meter = require('./meter');
const db = require('./db');
const wellStatus = require('./models/wellstatus');

meter.start();
meter.on('data', (data) => {
  wellStatus.create({    
    startTime: meter.data.startTime,
    endTime: meter.data.endTime,
    value: meter.data.value
  });

  console.log(meter.data);
  console.log(typeof data.value);
})

const well = {

}

module.exports = well;