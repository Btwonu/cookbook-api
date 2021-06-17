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
  avatar: {
    publicId: String,
    url: {
      type: String,
      default:
        'http://res.cloudinary.com/dvdmubcjl/image/upload/v1623779329/av-default-male_fekotj.svg',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
