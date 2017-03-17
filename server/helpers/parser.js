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

  startOfDay (date) {
    date = this.date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  },

  endOfDay (date) {
    date = this.date(date);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
  }
}

module.exports = parser;