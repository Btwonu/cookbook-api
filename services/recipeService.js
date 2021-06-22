const Recipe = require('../models/Recipe');
const AppError = require('../middleware/AppError');

const createOne = (data) => {
  const recipe = new Recipe(data);

  return recipe.save();
};

const getAll = async () => {
  return Recipe.find({}).lean();
};

const getOne = async (recipeId) => {
  let recipe = await Recipe.findById(recipeId).lean();

  if (!recipe) {
    throw new AppError('Recipe not found', 404);
  }

  return recipe;
};

const updateOne = async (recipeId, data) => {
  return Recipe.updateOne({ _id: recipeId }, data, { runValidators: true });
};

const deleteOne = async (recipeId) => {
  return Recipe.findByIdAndDelete(recipeId);
};

const getFiltered = async () => {
  return Recipe.find({}).sort({ creationDate: -1 }).limit(3).lean();
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
  getFiltered,
};
