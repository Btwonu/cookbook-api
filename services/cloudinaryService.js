const axios = require('axios');

const getAllAvatars = () => {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/dvdmubcjl/resources/image/upload?prefix=av`;

  return axios(url);
};

const getOneAvatar = (avatarId) => {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/dvdmubcjl/resources/image/upload/${avatarId}`;

  return axios(url);
};

module.exports = {
  getAllAvatars,
  getOneAvatar,
};
