// Validation
const yup = require('yup');

let recipeSchema = yup.object().shape({
  title: yup.string().required().min(5, 'NOT ENOUGH SYMBOLS, DUMBASS'),
  description: yup.string().required().min(10),
  image: yup.string().required().url(),
  ingredients: yup.array().required(),
  instructions: yup.array().required(),
  tags: yup.array().required(),
});

module.exports = recipeSchema;
