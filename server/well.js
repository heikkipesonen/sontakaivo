const meter = require('./meter');
const db = require('./db');
const wellStatus = require('./models/wellstatus');

meter.start();
meter.on('data', (data) => {
  wellStatus.create({    
    startTime: data.startTime,
    endTime: data.endTime,
    value: data.value
  });

  console.log(meter.data);
  console.log(typeof meter.data.value);
})

const well = {

}

module.exports = well;