'use strict';

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const dynamoose = require('dynamoose');

//let userSchema = new dynamoose.Schema({
//   username: String,
//   name: String,
//   phone: String
// });

// companyName: {
//   type: String,
//   required:true,
// },

let userSchema = new dynamoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    token: {
      required: true,
    },
  },
  org: {
    type: String,
    required: true,
  },
});



let User = dynamoose.model('user', userSchema);


module.exports = User;