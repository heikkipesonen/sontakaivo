const meter = require('../meter')
const db = require('../db')
const sequelize = require('sequelize')
const wellStatus = require('./wellstatus')
const parser = require('../helpers/parser')

meter.start()
meter.on('data', (data) => {
  wellStatus.create({
    value: meter.data.value
  })
})

const well = {
  /**
   * buld response
   * @param  {Date} startAt
   * @param  {Date} endAt
   * @param  {number} offset
   * @param  {number} limit
   * @param  {Promise} promise
   * @return {Promise}
   */
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
    })
  },

  /**
   * retrieve latest measurement
   * @return {Promise}
   */
  latest () {
    return wellStatus.findAndCountAll({
      offset: 0,
      limit: 1,
      attributes: {
        exclude: 'id'
      },
      orderBy: 'measuredAt DESC'
    })
  },

  /**
   * select a time range
   * @param  {Date} startAt
   * @param  {Date} endAt
   * @param  {number} offset
   * @param  {number} limit
   * @return {Promise}
   */
  range (startAt, endAt, offset = 0, limit) {
    offset = parser.number(offset)
    limit = parser.number(limit)

    startAt = startAt ? parser.date(startAt) : new Date(Date.now() - 24 * 60 * 60 * 1000)
    endAt = endAt ? parser.date(endAt) : new Date()

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
    )
  },

  /**
   * select items from one day,
   * return one average row as result
   * @param  {Date}
   * @return {Promise}
   */
  day (day = new Date()) {
    const startAt = parser.startOf(day)
    const endAt = parser.endOf(day)

    return this._respond(startAt, endAt, 0, 0,
      wellStatus.findAndCountAll({
        attributes: [
          [sequelize.fn('AVG', sequelize.col('value')), 'value'],
          [sequelize.fn('max', sequelize.col('measuredAt')), 'measuredAt']
        ],
        where: {
          measuredAt: {
            $gte: startAt,
            $lte: endAt
          }
        }
      }))
  },

  /**
   * select rows from one months time
   * @param  {Date} date
   * @return {Promise}
   */
  month (date = new Date()) {
    const startAt = parser.startOf(date, 'month')
    const endAt = parser.endOf(date, 'month')

    let queryDays = []
    let iterator = new Date(startAt.valueOf())
    while (iterator.getMonth() === startAt.getMonth()) {
      queryDays.push(new Date(iterator.valueOf()))
      iterator.setDate(iterator.getDate() + 1)
    }

    const promises = queryDays.map((day) => this.day(day))

    return this._respond(startAt, endAt, null, null, Promise.all(promises).then((days) => {
      return {
        count: null,
        rows: [].concat.apply([], days
          .filter((day) => day.rows.length > 0)
          .map((day) => day.rows))
      }
    }))
  }
}

module.exports = well
