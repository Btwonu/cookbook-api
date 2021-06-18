const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
    .then(async (user) => {
      let favoriteRecipes = await userService.getFavoriteRecipes(userId);
      let createdRecipes = await userService.getCreatedRecipes(userId);

      // filter out unneeded data before passing it to user
      let filteredFavoriteRecipes = favoriteRecipes.map((recipe) => ({
        _id: recipe._id,
        title: recipe.header,
      }));

      let filteredCreatedRecipes = createdRecipes.map((recipe) => ({
        _id: recipe._id,
        title: recipe.header,
      }));

      // user data to be passed to req.user is defined in deserializedUser
      const deserializedUser = {
        id: user._id,
        username: user.username,
        favoriteRecipes: filteredFavoriteRecipes,
        createdRecipes: filteredCreatedRecipes,
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
