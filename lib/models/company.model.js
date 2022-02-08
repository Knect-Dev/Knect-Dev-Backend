'use strict';

const dynamoose = require('dynamoose');

let companySchema = new dynamoose.Schema({

  companyName: {
    type: String,
    required:true,
  },
  foundingYear: Number,
  leader: String,
  employeeCount: Number,
  hqLocation: String,
  productOffering: String,
  clients: String,
  visonAndMission: String,

});

let company = dynamoose.model('company', companySchema);

module.exports = company;