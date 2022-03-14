'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { start } = require('./lib/server');
const { db } = require('./lib/models');

db.sync()
  .then(() => start(PORT))
  .catch((error) => console.log(error));