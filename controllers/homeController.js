const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.end('done');
});

module.exports = router;
