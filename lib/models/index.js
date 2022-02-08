'use strict';

require('dotenv').config();
const dynamoose = require('dynamoose');
const Collection = require('./data-collection.js');
const { Users } = require('./user.model');
const { Jobs } = require('./job.model');
const { Companies } = require('./company.model');


const ddb = new dynamoose.aws.sdk.DynamoDB({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-2',
});

dynamoose.aws.ddb.set(ddb);



module.exports = {

  Users: new Collection(Users),
  Jobs: new Collection(Jobs),
  Companies: new Collection(Companies),

};
