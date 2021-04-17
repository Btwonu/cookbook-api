const Recipe = require('../models/Recipe');

const createOne = (data, userId) => {
  const recipe = new Recipe({ ...data, creator: userId });

  return recipe.save();
};

const getAll = async () => {
  return Recipe.find({}).lean();
};

const getOne = async (recipeId) => {
  return Recipe.findById(recipeId).lean();
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
