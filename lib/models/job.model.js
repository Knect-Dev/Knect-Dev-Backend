'use strict';

const dynamoose = require('dynamoose');

// let friendSchema = new dynamoose.Schema({
//   id: String,
//   name: String,
//   phone: String
// });

// format job table data
let jobSchema = new dynamoose.Schema({
  id: String,
  jobTitle: {
    type: String,
    required: true,
  },
  dateApplied: Date,
  applicationStatus: Boolean,
  techUsed: String,
  numberPositions: Number,
  interviewStatus: Boolean,
  company: {
    type: Array,
    required: true,
  },
});

// use model method to talk to job table in DynamoDB
let Job = dynamoose.model('job', jobSchema);

module.exports = Job; // may need to change