const mongoose = require('mongoose');
const { isEmail } = require('../utils/validations');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: () => `Invalid email!`,
    },
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  createdRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
  // favoriteRecipes: [String],
  favoriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
