'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

describe('User Route Tests', () => {
  // it('should respond with a single user when accessed by admin ', () => {
  //   // a get request (with id) should result in a single user
  // });
  // it('should respond with a list of users when accessed by admin ', () => {
  //   // a get request (no id) should result in a list of all users
  // });

});
