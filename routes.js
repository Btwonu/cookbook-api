const { Router } = require('express');

const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const favoriteController = require('./controllers/favoriteController');
const imageController = require('./controllers/imageController');
const shoppingController = require('./controllers/shoppingController');

const router = Router();

router.use('/api/', homeController);
router.use('/api/auth', authController);
router.use('/api/recipes', recipeController);
router.use('/api/users', userController);
router.use('/api/favorites', favoriteController);
router.use('/api/images', imageController);
router.use('/api/shopping', shoppingController);

module.exports = router;
