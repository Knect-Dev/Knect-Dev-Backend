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

// Routes Reference
// 'use strict';
// require('dotenv').config();
// const { Users } = require('../models');
// const { Jobs } = require('../models');
// const { Companies } = require('../models');

// Users.get().then((data) => console.log(data));
// Jobs.get().then((data) => console.log(data));
// Companies.get().then((data) => console.log(data));
