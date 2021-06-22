const { Router } = require('express');

const router = Router();

const recipeService = require('../services/recipeService');
const userService = require('../services/userService');
const { extractRecipePresentationData } = require('../utils/recipeUtils');

const wrapAsync = require('../middleware/wrapAsync');
const AppError = require('../middleware/AppError');

const recipeSchema = require('../validation/recipeSchema');

const { isAuth, isRecipeCreator } = require('../middleware/authMiddleware');

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
    console.log(req.body.recipe);
    const recipeEditorData = req.body.recipe;
    const userId = req.user.id;
    const { username } = req.user;

    const recipePresentationData =
      extractRecipePresentationData(recipeEditorData);

    const recipeData = {
      creator: { id: userId, username },
      editorData: recipeEditorData,
      ...recipePresentationData,
    };

    const createdRecipeData = await recipeService.createOne(
      recipeData
    );

    await userService.addToCreatedRecipes(userId, createdRecipeData._id);

    return res.json(createdRecipeData);
  })
);

router.get(
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let recipe = await recipeService.getOne(recipeId);
    let userId = req.user.id;

    if (recipe.creator.id.equals(userId)) {
      recipe.isCreator = true;
    }

    res.json(recipe);
  })
);

router.patch(
  '/:recipeId',
  isRecipeCreator,
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    const recipeEditorData = req.body.recipe;

    const recipePresentationData =
      extractRecipePresentationData(recipeEditorData);

    const recipeData = {
      editorData: recipeEditorData,
      ...recipePresentationData,
      lastEdited: Date.now(),
    };

    let updatedRecipe = recipeService.updateOne(recipeId, recipeData);

    res.json({ patched: true, updatedRecipe });
  })
);

router.delete(
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let recipe = await recipeService.getOne(recipeId);
    let userId = req.user.id;

    if (!recipe.creator.id.equals(userId)) {
      next(new AppError('You are not authorized to do this!', 401));
    }

    await recipeService.deleteOne(recipeId);
    res.json({ delete: true, recipeId });
  })
);

function testRecipe(recipe) {
  console.log('===BLOCKS===');
  recipe.blocks.forEach((block) => {
    console.log(block);
  });
}

module.exports = router;
