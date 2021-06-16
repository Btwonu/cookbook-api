const axios = require('axios');

const getAvatars = () => {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/dvdmubcjl/resources/image/upload?prefix=av`;

  // return new Promise((res, rej) => rej());
  return axios({ method: 'GET', url });
};

module.exports = {
  getAvatars,
};
