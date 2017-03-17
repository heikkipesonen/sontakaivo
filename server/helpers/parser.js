const parser = {
  date (value) {
    return new Date( Date.parse( value) );
  }
}

module.exports = parser;