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
  'email': String,
  'role': {
    'type': String,
    'default': 'user',
  },
  'organization': String,
  'Jobs': Array,
});

let Users = dynamoose.model('Users', userSchema);

module.exports = {
  Users,
};
