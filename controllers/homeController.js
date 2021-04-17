const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
  res.render('home/about');
});

module.exports = router;
