'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Companies Route Tests', () => {
  it('should create a record when using POST ', () => {
    // create one company record
    // user and admin should be able to do this

  });
  it('should read a record when using GET and an Id ', () => {
    // read one company record
    // user and admin should be able to do this

  });
  it('should read all records when using GET no other search params ', () => {
    // return a list of all companies
    // user and admin should be able to do this

  });
  it('should update a record when using PUT and an Id ', () => {
    // update company record
    // user and admin should be able to do this

  });
  it('should delete a record when using DELETE and an Id', () => {
    // return a list of all companies
    // admin should only be able to do this

  });
});