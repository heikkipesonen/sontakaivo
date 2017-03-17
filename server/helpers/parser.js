const parser = {
  date (value) {
    if (typeof(value) === 'number') {
      return new Date(value);
    }
    return new Date( Date.parse(value) );
  }
}

module.exports = parser;