const User = require('../models/User');
const AppError = require('../middleware/AppError');

const add = async (username, recipeId) => {
  const user = await User.findOne({ username });

  // let foundRecipe = user.favoriteRecipes.find((recipeRefId) => {
  //   console.log(recipeRefId.equals(recipeId));
  //   return recipeRefId.equals(recipeId);
  // });

  let foundRecipe = user.favoriteRecipes.includes(recipeId);

  if (foundRecipe) {
    throw new AppError('Recipe is already added to favorites', 400);
  }

  user.favoriteRecipes.push(recipeId);
  return user.save();
};

const remove = async (username, recipeId) => {
  const user = await User.findOne({ username });

  let foundRecipeIndex = user.favoriteRecipes.findIndex(
    (favRecipeId) => favRecipeId === recipeId
  );

  if (foundRecipeIndex < 0) {
    throw new AppError('This recipe is not in favorites', 400);
  }

  user.favoriteRecipes.splice(foundRecipeIndex, 1);
  return user.save();
};

module.exports = {
  add,
  remove,
};
