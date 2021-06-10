const { Router } = require('express');
const router = Router();

const wrapAsync = require('../middleware/wrapAsync');
const favoriteService = require('../services/favoriteService');
const recipeService = require('../services/recipeService');

router.get('/', (req, res) => {
  const { username } = req.user;
  res.json({ favorites: true, username });
});

router.post(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const { username } = req.user;
    const { recipeId } = req.params;

    const recipe = await recipeService.getOne(recipeId);

    await favoriteService.add(username, recipe);

    res.json({ favorited: recipeId });
  })
);

router.delete(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const { username } = req.user;
    const { recipeId } = req.params;

    const recipe = await recipeService.getOne(recipeId);

    await favoriteService.remove(username, recipe);

    res.json({ deleted: recipeId });
  })
);

module.exports = router;
