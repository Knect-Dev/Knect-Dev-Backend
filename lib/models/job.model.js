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
  'location': {
    'type': String,
    'default': '',
    'required': false
  },
  'appliedDate': {
    'type': Date,
    'default': null,
    'required': false
  },
  'applied': {
    'type': Boolean,
    'default': false,
    'required': false
  },
  'technologies': {
    'type': Array,
    'schema': [String],
    'required': false,
    'default': [],
  },
  'openPositions': {
    'type': Number,
    'default': null,
    'required': false
  },
  'interview': {
    'type': Boolean,
    'default': false,
    'required': false
  },
  'contacts': {
    'type': String,
    'default': '',
    'required': false
  },
  'notes': {
    'type': String,
    'default': '',
    'required': false
  },
  'owner': {
    'type': String,
    'required': true,
  },
});

let Jobs = dynamoose.model('Jobs', jobSchema);

module.exports = {
  Jobs,
};
