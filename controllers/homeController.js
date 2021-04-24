const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  if (!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount++;
  }
  res.json({ home: true, viewCount: req.session.viewCount });
});

router.get('/about', (req, res) => {
  res.json({ about: true });
});

module.exports = router;
