'use strict';

const dynamoose = require('dynamoose');

const jobSchema = new dynamoose.Schema({
  'id': String,
  'company': String,
  'title': String,
  'location': String,
  'appliedDate': Date,
  'applied': Boolean,
  'technologies': Array,
  'openPositions': Number,
  'interview': Boolean,
  'contacts': String,
  'notes': String,
});

let Jobs = dynamoose.model('Jobs', jobSchema);

module.exports = {
  Jobs,
};
