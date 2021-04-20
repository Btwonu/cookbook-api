const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    trim: true,
  },
  image: {
    type: String,
  },
  // body: {
  //   type: String,
  //   required: true,
  //   minLength: 20,
  // },
  instructions: {
    type: Array,
  },
  creator: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  ingredients: {
    type: Array,
  },
  category: {
    type: String,
  },
  tags: {
    type: Array,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
