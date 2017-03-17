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

  latest () {
    return wellStatus.findAndCountAll({
      offset: 0,
      limit: 1,
      attributes: {
        exclude: 'id'
      },
      orderBy: 'measuredAt DESC'
    });
  },

  range (startAt, endAt, offset = 0, limit = 100) {
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
    const startAt = parser.startOf(day);
    const endAt = parser.endOf(day);

    return this._respond(startAt, endAt, 0, 0,
      wellStatus.findAndCountAll({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('value')), 'value']
        ],
        where: {
          measuredAt: {
            $gte: startAt,
            $lte: endAt
          }
        }
      }));
  },

  month (date = new Date()) {
    const startAt = parser.startOf(date, 'month');
    const endAt = parser.endOf(date, 'month');

    let queryDays = [];
    let iterator = new Date(startAt.valueOf());
    while (iterator.getMonth() === startAt.getMonth()) {
      queryDays.push(new Date(iterator.valueOf()));
      iterator.setDate(iterator.getDate() + 1);
    }

    const promises = queryDays.map((day) => this.day(day));
    return Promise.all(promises).then((days) => {
      return days.map((day) => day.rows);
    });
  }
}

module.exports = well;
