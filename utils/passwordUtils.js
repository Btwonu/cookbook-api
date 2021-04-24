const crypto = require('crypto');

const generatePassword = (password) => {
  let salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash,
  };
};

const validatePassword = (password, salt, hash) => {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return hash === hashVerify;
};

module.exports = {
  generatePassword,
  validatePassword,
};
