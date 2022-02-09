'use strict';

require('dotenv').config();

const Collection = require('./data-collections.js');
const { Users } = require('./user.model');
const { Jobs } = require('./job.model');
const { Companies } = require('./company.model');


module.exports = {
  Users: new Collection(Users),
  Jobs: new Collection(Jobs),
  Companies: new Collection(Companies),
};

