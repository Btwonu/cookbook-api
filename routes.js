const { Router } = require('express');

const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const favoriteController = require('./controllers/favoriteController');
const imageController = require('./controllers/imageController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/recipes', recipeController);
router.use('/users', userController);
router.use('/favorites', favoriteController);
router.use('/images', imageController);

module.exports = router;
