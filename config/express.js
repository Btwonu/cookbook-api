const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');
const { DB, cookie } = require('../config');

require('./passport');

module.exports = (app) => {
  app.use(
    cors({
      origin: [
        'https://frosty-mayer-b34023.netlify.app',
        'http://localhost:3000',
      ],
      credentials: true,
    })
  );

  app.use(morgan('combined'));

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: false }));

  app.use(express.json());

  app.set('trust proxy', 1);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie,
      store: MongoDbStore.create({ mongoUrl: DB.uri }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.session && req.user) {
      console.log(`${req.user.username} is logged in!`);
      console.log('req.session:', req.session);
      console.log('req.user:', req.user);
    }

    next();
  });
};
