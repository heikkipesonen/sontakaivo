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
  timeSpan (start, end, offset = 0, limit = 100) {
    limit = limit > 100 ? 100 : limit;
    start = parser.date(start);
    end = parser.date(end);

    return wellStatus.findAndCountAll({
      offset,
      limit,
      attributes: {
        exclude: 'id'
      },
      where: {
        measuredAt: {
          $gte: start,
          $lte: end
        }
      },
      order: 'measuredAt DESC'
    }).then((data) => {
      return {
        startAt: start.valueOf(),
        endAt: end.valueOf(),
        offset,
        limit,
        rows: data.rows,
        count: data.count
      }
    });
  }
}

module.exports = well;