const AppError = require('./AppError');

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new AppError('You are not authorized to view this resource.', 401));
  }
};

const isRecipeCreator = (req, res, next) => {
  console.log('from isRecipeCreator:', req.user);
  next();
};

// const isAdmin = (req, res, next) => {};

module.exports = {
  isAuth,
  isRecipeCreator,
  // isAdmin,
};
