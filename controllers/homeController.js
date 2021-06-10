const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  if (!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount++;
  }

  let user = req.user ? req.user.username : 'No one';

  res.json({ home: true, viewCount: req.session.viewCount, user });
});

router.get('/about', (req, res) => {
  res.json({ about: true });
});

router.get('/session', (req, res) => {
  res.json(req.session);
});

module.exports = router;
