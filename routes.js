const homeController = require('./controllers/homeController');

const { Router } = require('express');

const router = Router();

router.use(homeController);

module.exports = router;
