const { Router } = require('express');

const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');

const router = Router();

router.use('/', homeController);
router.use('/recipes', recipeController);

module.exports = router;
