const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');
const userService = require('../services/userService');
const { validatePassword } = require('../utils/passwordUtils');

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  userService
    .findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

function verifyCallback(username, password, done) {
  userService
    .findOne(username)
    .then((user) => {
      if (!user) return done(null, false);

      const isValid = validatePassword(password, user.salt, user.hash);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
}
