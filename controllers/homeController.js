const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ home: true });
});

router.get('/about', (req, res) => {
  res.json({ about: true });
});

module.exports = router;
