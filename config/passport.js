const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');
const userService = require('../services/userService');
const favoriteService = require('../services/favoriteService');
const { validatePassword } = require('../utils/passwordUtils');

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  userService
    .findById(userId)
    .then(async (user) => {
      let favoriteRecipes = await favoriteService.getUserFavorites(
        user.username
      );

      // filter out unneeded data before passing favoriteRecipes to user
      let filteredFavoriteRecipes = favoriteRecipes.map((recipe) => ({
        _id: recipe._id,
        title: recipe.header,
      }));

      // user data to be passed to req.user is defined in deserializedUser
      const deserializedUser = {
        id: user._id,
        username: user.username,
        favoriteRecipes: filteredFavoriteRecipes,
        avatar: user.avatar,
      };

      done(null, deserializedUser);
    })
    .catch((err) => done(err));
});

function verifyCallback(username, password, done) {
  userService
    .findByUsername(username)
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
