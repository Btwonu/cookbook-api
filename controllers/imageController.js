const { Router } = require('express');

const router = Router();

const cloudinaryService = require('../services/cloudinaryService');

let cachedData;
let cacheTime;

router.get('/', (req, res) => {
  console.log({ cacheTime });
  console.log('Now: ', Date.now());
  if (cacheTime && cacheTime > Date.now() - 30 * 1000 * 60) {
    console.log('Returning cached data');
    return res.json(cachedData);
  }

  cloudinaryService
    .getAvatars()
    .then((r) => {
      cachedData = r.data;
      cacheTime = Date.now();
      return res.json(r.data);
    })
    .catch((e) => {
      res.send('done');
    });
});

module.exports = router;
