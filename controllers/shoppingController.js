const { Router } = require('express');
const router = Router();

const shoppingService = require('../services/shoppingService');
const userService = require('../services/userService');
const wrapAsync = require('../middleware/wrapAsync');

router.get('/', (req, res) => {
  res.end('shopping');
});

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const products = req.body;
    const userId = req.user.id;
    const {username} = req.user;

    const shoppingList = {
      creator: {
        id: userId,
        username 
      },
      products
    };

    let createdList = await shoppingService.createList(shoppingList);

    await userService.addToCreatedShoppingLists(userId, createdList);

    res.json(createdList);
  })
);

module.exports = router;
