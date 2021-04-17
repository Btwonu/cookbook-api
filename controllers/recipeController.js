const { Router } = require('express');

const router = Router();

const recipeService = require('../services/recipeService');

const appError = require('../middleware/appError');
const wrapAsync = require('../middleware/wrapAsync');

router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    let recipes = await recipeService.getAll();

    res.json(recipes);
  })
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    let { title, description, body, image, tags } = req.body;
    let tagsArray = tags.split(',');

    let newRecipe = { title, description, body, image, tags: tagsArray };

    // validate req.body
    // let valid = title != '' && tagsArray;

    // if (!valid) {
    //   throw new appError('Simulated error', 400);
    //   return res.send('simulated error');
    // }

    let data = await recipeService.createOne(newRecipe, 'Val');

    res.json(data);
  })
);

router.get(
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let recipe = await recipeService.getOne(recipeId);

    res.json(recipe);
  })
);

router.patch(
  '/:articleId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let { title, description, body, image, tags } = req.body;
    let tagsArray = tags.split(',');
    let updatedRecipe = {
      title,
      description,
      body,
      image,
      tags: tagsArray,
    };

    await recipeService.updateOne(recipeId, updatedRecipe);
    res.json({ patched: true, updatedRecipe });
  })
);

module.exports = router;
