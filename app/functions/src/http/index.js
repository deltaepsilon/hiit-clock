const express = require('express');
const Sitemap = require('./sitemap/sitemap');
const app = express();

module.exports = context => {
  app.get('/sitemap.txt', Sitemap(context));

  return app;
};
