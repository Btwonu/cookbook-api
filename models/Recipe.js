const mongoose = require('mongoose');

// const recipeSchema = mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     minLength: 5,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     minLength: 10,
//     trim: true,
//   },
//   image: {
//     type: String,
//   },
//   // body: {
//   //   type: String,
//   //   required: true,
//   //   minLength: 20,
//   // },
//   instructions: {
//     type: Array,
//   },
//   creator: {
//     // type: mongoose.Schema.Types.ObjectId,
//     // ref: 'User',
//     type: String,
//   },
//   creationDate: {
//     type: Date,
//     default: Date.now,
//   },
//   ingredients: {
//     type: Array,
//   },
//   category: {
//     type: String,
//   },
//   tags: {
//     type: Array,
//   },
// });

const recipeSchema = mongoose.Schema({
  editorData: {
    type: {
      time: {
        type: Number,
        required: true,
      },
      blocks: {
        type: [Object],
        required: true,
      },
      version: {
        type: String,
        required: true,
      },
    },
  },
  creator: {
    type: String,
  },
  header: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  summary: {
    type: String,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
