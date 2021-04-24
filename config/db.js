const mongoose = require('mongoose');
const { DB } = require('../config');

console.log('URI', DB.uri);

module.exports = mongoose
  .connect(DB.uri, DB.options)
  .then((res) => {
    // console.log(mongoose.connections.length);
    console.log('DB connected..');
    console.log('Connections:', mongoose.connections.length);
  })
  .catch((err) => {
    // handle error
    return console.error(err);
  });

// const connection = mongoose.createConnection(DB.uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
