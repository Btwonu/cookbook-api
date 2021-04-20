const express = require('express');
const handlebars = require('express-handlebars');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(cors());

  app.use(morgan('combined'));

  app.use(express.static('public'));

  app.use(express.urlencoded({ extended: false }));

  app.use(express.json());
};
