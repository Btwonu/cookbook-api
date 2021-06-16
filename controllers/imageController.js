const { Router } = require('express');

const router = Router();

const wrapAsync = require('../middleware/wrapAsync');
const cloudinaryService = require('../services/cloudinaryService');

let cachedData;
let cacheTime;

router.get(
  '/avatars',
  wrapAsync(async (req, res) => {
    console.log({ cacheTime });
    console.log('Now: ', Date.now());
    if (cacheTime && cacheTime > Date.now() - 30 * 1000 * 60) {
      console.log('Returning cached data');
      return res.json(cachedData);
    }

    let data = await cloudinaryService.getAllAvatars().then((r) => r.data);
    cachedData = data;
    cacheTime = Date.now();
    return res.json(data);
  })
);

router.get(
  '/avatars/:avatarId',
  wrapAsync(async (req, res) => {
    const { avatarId } = req.params;

    let data = await cloudinaryService
      .getOneAvatar(avatarId)
      .then((r) => r.data);
    return res.json(data);
  })
);

module.exports = router;
