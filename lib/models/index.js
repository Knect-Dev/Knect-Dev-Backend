'use strict';

const userModel = require('./user.model.js');
const jobModel = require('./job.model.js');
const companyModel = require('./company.model.js');


module.exports = {
  user: userModel,
  job: jobModel,
  company: companyModel,
};




