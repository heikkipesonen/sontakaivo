const meter = require('./meter');
const db = require('./db');
const wellStatus = require('./models/wellstatus');

meter.start();
meter.on('data', (data) => {
  wellStatus.create({    
    value: meter.data.value
  });
});

const well = {
  timeSpan (start, end, offset = 0) {
    return wellStatus.findAll({
      offset,
      limit: 1000,
      attributes: {
        exclude: 'id'
      },
      where: {
        measuredAt: {
          $gte: new Date(Date.parse(start)),
          $lte: new Date(Date.parse(end))
        }
      },
      order: 'measuredAt DESC'
    });
  }
}

module.exports = well;