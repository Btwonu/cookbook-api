const mongoose = require('mongoose');
const { DB } = require('../config');

module.exports = mongoose
  .connect(DB.uri, DB.options)
  .then((res) => {
    console.log('DB connected..');
  })
  .catch((err) => {
    // handle error
    return console.error(err);
  });
