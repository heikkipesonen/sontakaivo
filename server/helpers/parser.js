const moment = require('moment');

const parser = {
  date (value) {
    if (typeof(value) === 'number') {
      return new Date(value);
    }
    return new Date( Date.parse(value) );
  },

  number (value, max = null) {
    let number = parseInt(value);
    return max !== null && number > max ? max : number;
  },

  startOf (date, type = 'day') {
    return moment(this.date(date)).startOf(type).toDate();
  },

  endOf (date, type = 'day') {
    return moment(this.date(date)).endOf(type).toDate();
  },

  format (date, format = 'YYYY-MM-DD') {
    return moment(date).format(format);
  }
}

module.exports = parser;
