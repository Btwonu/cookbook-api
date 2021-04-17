const faker = require('faker');
const axios = require('axios');

const uppercaseFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const generateTags = (maxCount = 5) => {
  let tags = [];

  let numberOfTags = Math.floor(Math.random() * maxCount + 1);

  for (let i = 0, l = numberOfTags; i < l; i++) {
    tags.push(faker.random.word().toLowerCase());
  }

  return tags;
};

const generateCategory = () => {
  const categories = ['breakfast', 'dinner', 'desert'];
  let random = Math.floor(Math.random() * categories.length);

  return categories[random];
};

const generateInstructions = (maxCount = 5) => {
  let instructions = [];

  let numberOfInstructions = Math.floor(Math.random() * maxCount + 1);

  for (let i = 0, l = numberOfInstructions; i < l; i++) {
    instructions.push(uppercaseFirstLetter(faker.lorem.sentences()));
  }

  return instructions;
};

const generateRecipes = async (count) => {
  let recipes = [];

  for (let i = 0, l = count; i < l; i++) {
    let newRecipe = {
      title: faker.commerce.productName(),
      description: uppercaseFirstLetter(faker.lorem.sentences()),
      image: faker.image.image(),
      createdAt: faker.date.recent().toLocaleDateString(),
      category: generateCategory(),
      tags: generateTags(),
      creator: faker.name.firstName(),
      instructions: generateInstructions(),
      ingredients: generateTags(),
    };

    recipes.push(newRecipe);
  }

  return recipes;
};

module.exports = generateRecipes;

// let id = faker.random.uuid(),
//   title = faker.commerce.productName(),
//   image = faker.image.image(),
//   createdAt = faker.date.recent().toLocaleDateString(),
//   ingredients = generateIngredients(),
//   instructions = uppercaseFirstLetter(faker.lorem.sentences()),
//   category = generateCategory(),
//   chef = generateChef();
