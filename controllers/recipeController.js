const { Router } = require('express');

const router = Router();

const recipeService = require('../services/recipeService');

const appError = require('../middleware/appError');
const wrapAsync = require('../middleware/wrapAsync');

const recipeSchema = require('../validation/recipeSchema');

const { isAuth } = require('../middleware/authMiddleware');

router.get(
  '/',
  isAuth,
  wrapAsync(async (req, res, next) => {
    let recipes = await recipeService.getAll();

    res.json(recipes);
  })
);

router.post(
  '/',
  wrapAsync(async (req, res, next) => {
    let newRecipe = await recipeSchema.validate(req.body);
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
    let updatedRecipe = await recipeSchema.validate(req.body);

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
