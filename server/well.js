const meter = require('./meter');
const db = require('./db');
const wellStatus = require('./models/wellstatus');
const parser = require('./helpers/parser');

meter.start();
meter.on('data', (data) => {
  wellStatus.create({    
    value: meter.data.value
  });
});

const well = {
  timeSpan (startAt, endAt, offset = 0, limit = 100) {
    offset = parser.number(offset);
    limit = parser.number(limit, 100);
    
    startAt = startAt ? parser.date(startAt) : new Date( Date.now() - 24 * 60 * 60 * 1000 );
    endAt = endAt ? parser.date(endAt) : new Date();

    return wellStatus.findAndCountAll({
      offset,
      limit,
      attributes: {
        exclude: 'id'
      },
      where: {
        measuredAt: {
          $gte: startAt,
          $lte: endAt
        }
      },
      order: 'measuredAt DESC'
    }).then((data) => {
      return {
        startAt: startAt.valueOf(),
        endAt: endAt.valueOf(),
        offset,
        limit,
        rows: data.rows,
        count: data.count
      }
    });
  },

  day (day = new Date(), offset = 0, limit = 100) {
    let startAt = parser.startOfDay(day);
    let endAt = parser.endOfDay(day);  
    return this.timeSpan(startAt, endAt, offset, limit);
  }
}

module.exports = well;