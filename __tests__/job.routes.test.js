'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

xdescribe('Job Route Tests', () => {
  // it('should create a record when using POST ', () => {
  //   // create one job record
  //   // user and admin should be able to do this

  // });
  // it('should read a record when using GET and an Id ', () => {
  //   // read one job record
  //   // user should only be able to do this to their own job
  //   //admin should be able to access any job

  // });
  // it('should read all records when using GET no other search params ', () => {
  //   // return a list of all companies
  //   //user/admin should only be able to do this to their own jobs
  //   //admin should be able to access any job

  // });
  // it('should update a record when using PUT and an Id ', () => {
  //   // update job record
  //   // user should only be able to do this to their own job

  // });
  // it('should delete a record when using DELETE and an Id', () => {
  //   // return a list of all companies
  //   // user/admin should only be able to do this to their own job

  // });
});
