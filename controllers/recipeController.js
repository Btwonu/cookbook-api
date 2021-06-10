const { Router } = require('express');

const router = Router();

const recipeService = require('../services/recipeService');
const userService = require('../services/userService');
const { extractRecipePresentationData } = require('../utils/recipeUtils');

const wrapAsync = require('../middleware/wrapAsync');

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
    let editorData = req.body.recipe;

    let presentationData = extractRecipePresentationData(editorData);

    let recipeData = { editorData, ...presentationData };

    let { username } = await userService.findById(req.user.id);
    let data = await recipeService.createOne(recipeData, username);

    return res.json(data);
    // let newRecipe = await recipeSchema.validate(req.body);
    // let data = await recipeService.createOne(newRecipe, 'Val');

    // res.json(data);
  })
);

router.get(
  '/:recipeId',
  wrapAsync(async (req, res, next) => {
    let { recipeId } = req.params;
    let recipe = await recipeService.getOne(recipeId);

    let { username } = req.user;
    if (username === recipe.creator) {
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

function testRecipe(recipe) {
  console.log('===BLOCKS===');
  recipe.blocks.forEach((block) => {
    console.log(block);
  });
}

module.exports = router;
