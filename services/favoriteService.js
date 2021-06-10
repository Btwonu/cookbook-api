const User = require('../models/User');
const AppError = require('../middleware/AppError');

const add = async (username, recipe) => {
  const user = await User.findOne({ username });

  let foundRecipe = user.favoriteRecipes.find((recipeRefId) => {
    console.log(recipeRefId.equals(recipe));
    return recipeRefId.equals(recipe);
  });

  // let foundRecipe = user.favoriteRecipes.includes(recipeId);

  if (foundRecipe) {
    throw new AppError('Recipe is already added to favorites', 400);
  }

  user.favoriteRecipes.push(recipe);
  return user.save();
};

const remove = async (username, recipe) => {
  const user = await User.findOne({ username });

  let foundRecipeIndex = user.favoriteRecipes.findIndex((recipeRefId) =>
    recipeRefId.equals(recipe)
  );

  if (foundRecipeIndex < 0) {
    throw new AppError('This recipe is not in favorites', 400);
  }

  user.favoriteRecipes.splice(foundRecipeIndex, 1);
  return user.save();
};

const getUserFavorites = async (username) => {
  let user = await User.findOne({ username }).populate('favoriteRecipes');
  return user.favoriteRecipes;
};

module.exports = {
  add,
  remove,
  getUserFavorites,
};
