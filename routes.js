const { Router } = require('express');

const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/recipes', recipeController);

module.exports = router;
