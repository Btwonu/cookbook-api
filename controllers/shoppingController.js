const { Router } = require('express');
const router = Router();

const userService = require('../services/userService');
const wrapAsync = require('../middleware/wrapAsync');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const userId = req.user.id;

    const shoppingList = await userService.getShoppingList(userId);
    res.json(shoppingList);
  })
);

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const products = req.body;
    const userId = req.user.id;

    const shoppingList = {
      lastEdited: Date.now(),
      products,
    };

    await userService.addShoppingList(userId, shoppingList);

    res.json(shoppingList);
  })
);

module.exports = router;
