'use strict';

const express = require('express');
const app = express();

const error500Handler = require('./error-handler/500.js');
const error404Handler = require('./error-handlers/404.js');
const error403Handler = require('./error-handlers/403');




//catch-all
app.use(error404Handler);
app.use(error500Handler);
app.use(error403Handler);

module.exports = {
  app,
  start: (port) => {
    if (!port) throw new Error('Missing Port');
    app.listen(port, () => {
      console.log(`LISTENING ON PORT ${port}`);
    });
  },
};
