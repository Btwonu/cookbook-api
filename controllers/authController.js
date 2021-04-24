const { Router } = require('express');
const passport = require('passport');

const router = Router();

const userService = require('../services/userService');
const { generatePassword } = require('../utils/passwordUtils');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.json({ auth: true });
});

router.get('/login', (req, res) => {
  res.json({ login: true });
});

router.get('/secret', isAuth, (req, res) => {
  res.send('You are seeing very secret');
});

router.post('/register', (req, res) => {
  let { username, password } = req.body;
  let { salt, hash } = generatePassword(password);

  userService
    .create(username, salt, hash)
    .then((user) => console.log(`User created successfully: ${user}`));

  res.json({ register: true });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
