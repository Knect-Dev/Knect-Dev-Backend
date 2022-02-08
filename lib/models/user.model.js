'use strict';

const dynamoose = require('dynamoose');

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
