const { Router } = require('express');
const router = Router();

const wrapAsync = require('../middleware/wrapAsync');
const favoriteService = require('../services/favoriteService');

router.get('/', (req, res) => {
  const { username } = req.user;
  res.json({ favorites: true, username });
});

router.post(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const { username } = req.user;
    const { recipeId } = req.params;

    await favoriteService.add(username, recipeId);

    res.json({ favorited: recipeId });
  })
);

router.delete(
  '/:recipeId',
  wrapAsync(async (req, res) => {
    const { username } = req.user;
    const { recipeId } = req.params;

    await favoriteService.remove(username, recipeId);

    res.json({ deleted: recipeId });
  })
);

module.exports = router;
