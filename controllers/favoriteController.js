const { Router } = require('express');
const router = Router();

const wrapAsync = require('../middleware/wrapAsync');
const userService = require('../services/userService');
const recipeService = require('../services/recipeService');

router.get('/', (req, res) => {
  const { username } = req.user;
  res.json({ favorites: true, username });
});

router.post(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const recipe = await recipeService.getOne(recipeId);

    // await favoriteService.add(username, recipe);
    await userService.addToFavoriteRecipes(userId, recipe);

    res.json({ favorited: recipeId });
  })
);

router.delete(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const recipe = await recipeService.getOne(recipeId);

    // await favoriteService.remove(username, recipe);
    await userService.removeFavoriteRecipe(userId, recipe);

    res.json({ deleted: recipeId });
  })
);

module.exports = router;
