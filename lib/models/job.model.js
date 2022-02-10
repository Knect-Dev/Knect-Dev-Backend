'use strict';

const dynamoose = require('dynamoose');


const ddb = new dynamoose.aws.sdk.DynamoDB({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-2',
});

dynamoose.aws.ddb.set(ddb);


const jobSchema = new dynamoose.Schema({
  'id': {
    'type': String,
    'required': true,
  },
  'company': {
    'type': String,
    'required': true,
  },
  'title': {
    'type': String,
    'required': true,
  },
  'location': String,
  'appliedDate': Date,
  'applied': Boolean,
  'technologies': Array,
  'openPositions': Number,
  'interview': Boolean,
  'contacts': String,
  'notes': String,
  'owner': {
    'type': String,
    'required': true,
  },
});

let Jobs = dynamoose.model('Jobs', jobSchema);

module.exports = {
  Jobs,
};
