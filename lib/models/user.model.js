'use strict';

const dynamoose = require('dynamoose');

const ddb = new dynamoose.aws.sdk.DynamoDB({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-2',
});

dynamoose.aws.ddb.set(ddb);

const userSchema = new dynamoose.Schema({
  'id': String,
  'firstName': String,
  'lastName': String,
  'password': String,
  'token': String,
  'approvedViewer': Array,
  'email': String,
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
