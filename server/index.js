const server = require('./server');
require('dotenv').config();

server.listen(8080, () => {
  console.log('shitwell running.....');
});
