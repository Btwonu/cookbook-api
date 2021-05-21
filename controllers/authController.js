const { Router } = require('express');
const passport = require('passport');

const router = Router();

const userService = require('../services/userService');
const { generatePassword } = require('../utils/passwordUtils');
const { isAuth } = require('../middleware/authMiddleware');
const appError = require('../middleware/appError');

router.get('/', (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next(new appError('Not authorized!', 401));
  }
});

router.get('/login', (req, res) => {
  res.json({ login: true });
});

router.get('/secret', isAuth, (req, res) => {
  res.send('You are seeing very secret, ' + req.user.username + '.');
});

router.post('/register', (req, res) => {
  let { username, password } = req.body;
  let { salt, hash } = generatePassword(password);

  userService.create(username, salt, hash).then((user) => {
    console.log(`User created successfully: ${user}`);
    req.login(user, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
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
