const meter = require('./meter');
const db = require('./db');
const sequelize = require('sequelize');
const wellStatus = require('./models/wellstatus');
const parser = require('./helpers/parser');

meter.start();
meter.on('data', (data) => {
  wellStatus.create({    
    value: meter.data.value
  });
});

const well = {
  _respond (startAt, endAt, offset, limit, promise) {
    return promise.then((data) => {
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

  timeSpan (startAt, endAt, offset = 0, limit = 100) {
    offset = parser.number(offset);
    limit = parser.number(limit, 100);
    
    startAt = startAt ? parser.date(startAt) : new Date( Date.now() - 24 * 60 * 60 * 1000 );
    endAt = endAt ? parser.date(endAt) : new Date();

    return this._respond(startAt, endAt, offset, limit, 
      wellStatus.findAndCountAll({
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
      })
    );
  },

  day (day = new Date()) {
    const startAt = parser.startOfDay(day);
    const endAt = parser.endOfDay(day);  

    return wellStatus.findAndCountAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('value'))], 'value'],
      where: {
        measuredAt: {
          $gte: startAt,
          $lte: endAt
        }        
      }
    }).then((data) => {
      console.log(data);
      return data;
    });    
  }
}

module.exports = well;