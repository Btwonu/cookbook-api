const User = require('../models/User');

const getAll = async () => {
  return User.find({}).lean();
};

const findByUsername = async (username) => {
  return User.findOne({ username }).lean();
};

const findById = async (userId) => {
  return User.findById(userId).lean();
};

const create = async (username, email, salt, hash) => {
  let newUser = new User({ username, email, salt, hash });
  return newUser.save();
};

const updateAvatar = async (userId, avatarData) => {
  let u = await User.findById(userId);
  u.avatar = avatarData;
  return u.save();
};

const addToCreatedRecipes = async (userId, recipeId) => {
  let u = await User.findById(userId);
  u.createdRecipes.push(recipeId);
  return u.save();
};

const addToFavoriteRecipes = async (userId, recipe) => {
  const u = await User.findById(userId);

  console.log({ u });

  let foundRecipe = u.favoriteRecipes.find((recipeRefId) => {
    return recipeRefId.equals(recipe._id);
  });

  // let foundRecipe = u.favoriteRecipes.includes(recipeId);

  if (foundRecipe) {
    throw new AppError('Recipe is already added to favorites', 400);
  }

  u.favoriteRecipes.push(recipe);
  return u.save();
};

const addShoppingList = async (userId, shoppingList) => {
  const u = await User.findById(userId);

  u.shoppingList = shoppingList;
  await u.save();
  return;
};

const removeFavoriteRecipe = async (userId, recipe) => {
  const u = await User.findById(userId);

  let foundRecipeIndex = u.favoriteRecipes.findIndex((recipeRefId) => {
    return recipeRefId.equals(recipe._id);
  });

  if (foundRecipeIndex < 0) {
    throw new AppError('This recipe is not in favorites', 400);
  }

  u.favoriteRecipes.splice(foundRecipeIndex, 1);
  return u.save();
};

const getFavoriteRecipes = async (userId) => {
  let u = await User.findById(userId).populate('favoriteRecipes');
  return u.favoriteRecipes;
};

const getCreatedRecipes = async (userId) => {
  let u = await User.findById(userId).populate('createdRecipes');
  return u.createdRecipes;
};

// const updateOne = async (recipeId, data) => {
//   return Recipe.updateOne({ _id: recipeId }, data, { runValidators: true });
// };

// const deleteOne = async (recipeId) => {
//   return Recipe.findByIdAndDelete(recipeId);
// };

// const getFiltered = async () => {
//   return Recipe.find({}).sort({ creationDate: -1 }).limit(3).lean();
// };

module.exports = {
  getAll,
  findByUsername,
  findById,
  create,
  updateAvatar,
  addToCreatedRecipes,
  getFavoriteRecipes,
  removeFavoriteRecipe,
  getCreatedRecipes,
  addToFavoriteRecipes,
  addShoppingList,
};
