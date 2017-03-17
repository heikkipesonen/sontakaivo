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
  timeSpan (start, end, offset = 0, limit = 100) {
    return wellStatus.findAll({
      offset,
      limit,
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
    }).then((rows) => {
      return {
        offset,
        limit,
        rows
      }
    });
  }
}

module.exports = well;