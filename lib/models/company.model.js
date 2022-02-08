'use strict';

const dynamoose = require('dynamoose');

const ddb = new dynamoose.aws.sdk.DynamoDB({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-2',
});

dynamoose.aws.ddb.set(ddb);


const companySchema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'leader': String,
  'size': Number,
  'hqLocation': String,
  'product': String,
  'clients': String,
  'mission': String,
});

const Companies = dynamoose.model('Companies', companySchema);

module.exports = {
  Companies,
};


