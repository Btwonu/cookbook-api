const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
  const hbs = handlebars.create({
    extname: 'hbs',
    helpers: {
      whatis: function (param) {
        console.log('THIS IS:', param);
      },
    },
  });

  app.engine('hbs', hbs.engine);

  app.set('view engine', 'hbs');

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: false }));

  // app.use(express.json());
};
