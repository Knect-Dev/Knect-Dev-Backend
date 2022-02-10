'use strict';

const dynamoose = require('dynamoose');

const ddb = new dynamoose.aws.sdk.DynamoDB({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-2',
});

dynamoose.aws.ddb.set(ddb);

// “email”: {
//   “type”: String,
//   “required”: true
// }


const userSchema = new dynamoose.Schema({
  'id': {
    'type': String,
    'required': true,
  },
  'firstName': {
    'type': String,
    'required': true,
  },
  'lastName': {
    'type': String,
    'required': true,
  },
  'password': {
    'type': String,
    'required': true,
  }, // need to encrypt
  'token': {
    'type': String,
    'required': true,
  },
  'approvedViewer': Array,
  'email': {
    'type': String,
    'required': true,
  },
  'role': {
    'type': String,
    'default': 'user',
  },
  'Jobs': Array,
});

let Users = dynamoose.model('Users', userSchema);

module.exports = {
  Users,
};
