const { Router } = require('express');
const passport = require('passport');

const router = Router();

const userService = require('../services/userService');
const { generatePassword } = require('../utils/passwordUtils');
const { isAuth } = require('../middleware/authMiddleware');
const AppError = require('../middleware/AppError');
const wrapAsync = require('../middleware/wrapAsync');

router.get('/', (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next(new AppError('Not authorized!', 401));
  }
});

router.get('/login', (req, res) => {
  res.json({ login: true });
});

router.get('/secret', isAuth, (req, res) => {
  res.send('You are seeing very secret, ' + req.user.username + '.');
});

router.post(
  '/register',
  wrapAsync(async (req, res, next) => {
    let { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new AppError('Passwords do not match', 400);
    }

    let { salt, hash } = generatePassword(password);

    let user = await userService.create(username, email, salt, hash);
    console.log(`User created successfully: ${user}`);
    req.login(user, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  })
);

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
