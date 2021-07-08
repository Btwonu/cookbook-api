require('dotenv').config();
const express = require('express');
const config = require('./config');
const routes = require('./routes');
const app = express();
const errorHandler = require('./middleware/errorHandler');

require('./config/express')(app);
require('./config/db');

app.use(routes);

app.use((req, res, next) => {
  res.status(404).end('404');
});

app.use(errorHandler);

app.listen(
  config.port,
  console.log(`Ctrl + click => http://localhost:${config.port}`)
);
