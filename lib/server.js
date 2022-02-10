'use strict';

const express = require('express');
const server = express();
const morgan = require('morgan');

const error500Handler = require('./error-handlers/500.js');
const error404Handler = require('./error-handlers/404.js');



server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Auth routes
const authRoutes = require('./routes/auth.routes.js');
// CRUD routes
const routes = require('./routes/index.js');

// logger
server.use(morgan('dev'));

server.use(authRoutes);
server.use(routes);

//catch-all
server.use(error404Handler);
server.use(error500Handler);



module.exports = {
  server,
  start: (port) => {
    if (!port) throw new Error('Missing Port');
    server.listen(port, () => {
      console.log(`LISTENING ON PORT ${port}`);
    });
  },
};
