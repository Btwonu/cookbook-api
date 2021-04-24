const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
const { DB } = require('../config');

module.exports = (app) => {
  app.use(cors());

  app.use(morgan('combined'));

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: false }));

  app.use(express.json());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      store: MongoDbStore.create({ mongoUrl: DB.uri }),
    })
  );
};
