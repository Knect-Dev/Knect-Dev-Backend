'use strict';

const dynamoose = require('dynamoose');

const jobSchema = new dynamoose.Schema({
  'id': String,
  'company': String,
  'title': String,
  'appliedDate': Date,
  'applied': Boolean,
  'technologies': Array,
  'openPositions': Number,
  'interview': Boolean,
});

let Jobs = dynamoose.model('Jobs', jobSchema);

module.exports = {
  Jobs,
};
