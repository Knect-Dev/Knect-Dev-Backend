'use strict';

const dynamoose = require('dynamoose');

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


