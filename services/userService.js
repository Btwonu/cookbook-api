const User = require('../models/User');

const getAll = async () => {
  return User.find({}).lean();
};

const findOne = async (username) => {
  return User.findOne({ username }).lean();
};

const findById = async (userId) => {
  return User.findById(userId).lean();
};

const create = async (username, salt, hash) => {
  let newUser = new User({ username, salt, hash });
  return newUser.save();
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
  findOne,
  findById,
  create,
  // updateOne,
  // deleteOne,
  // createOne,
  // getFiltered,
};
