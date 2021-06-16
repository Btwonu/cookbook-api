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

router.post(
  '/:username/avatar',
  wrapAsync(async (req, res) => {
    const { userId, avatar } = req.body;

    console.log({ userId, avatar });

    await userService.updateAvatar(userId, avatar);

    res.send('done');
  })
);

module.exports = router;
