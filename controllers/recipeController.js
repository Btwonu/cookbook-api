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
    let newRecipe = {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      image: req.body.image,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions.split(','),
      tags: req.body.tags.split(','),
    };

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
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let updatedRecipe = {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      image: req.body.image,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions.split(','),
      tags: req.body.tags.split(','),
    };

    // validate data

    await recipeService.updateOne(recipeId, updatedRecipe);
    res.json({ patched: true, updatedRecipe });
  })
);

router.delete(
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;

    await recipeService.deleteOne(recipeId);
    res.json({ delete: true, recipeId });
  })
);

module.exports = router;
