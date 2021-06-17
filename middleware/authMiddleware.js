const recipeService = require('../services/recipeService');
const AppError = require('./AppError');

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new AppError('You are not authorized to view this resource.', 401));
  }
};

const isRecipeCreator = async (req, res, next) => {
  let { recipeId } = req.params;
  let recipe = await recipeService.getOne(recipeId);
  let userId = req.user.id;

  console.log(recipe.creator.id, userId);

  if (!recipe.creator.id.equals(userId)) {
    next(new AppError('You are not authorized to do this!', 401));
  }

  next();
};

// const isAdmin = (req, res, next) => {};

module.exports = {
  isAuth,
  isRecipeCreator,
  // isAdmin,
};
