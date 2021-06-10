const { Router } = require('express');
const router = Router();

const userService = require('../services/userService');
const wrapAsync = require('../middleware/wrapAsync');

router.get('/', (req, res) => {
  const { username } = req.user;
  res.json({ user: username });
});

router.get(
  '/:username/favorites',
  wrapAsync(async (req, res) => {
    const { username } = req.params;

    let found = await userService.findByUsername(username);
    console.log(found);
    res.json({ username: req.params.username });
  })
);

module.exports = router;
