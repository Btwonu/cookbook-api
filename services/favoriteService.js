const User = require('../models/User');
const AppError = require('../middleware/AppError');

const add = async (username, recipe) => {
  const user = await User.findOne({ username });

  let foundRecipe = user.favoriteRecipes.find((recipeRefId) => {
    return recipeRefId.equals(recipe._id);
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

  let foundRecipeIndex = user.favoriteRecipes.findIndex((recipeRefId) => {
    console.log({ recipeRefId });
    console.log({ recipe });
    console.log(recipeRefId.equals(recipe._id));
    return recipeRefId.equals(recipe._id);
  });

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
