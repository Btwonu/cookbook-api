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
  // updateOne,
  // deleteOne,
  // createOne,
  // getFiltered,
};
