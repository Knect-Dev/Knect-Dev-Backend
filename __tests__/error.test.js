'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

xdescribe('403 Error Handler Tests', () => {
  it('should respond with a 403 status when not authenticated', async () => {
    //without Authentication, expect this to fail
    const response = await request.get('/Users');
    expect(response.status).toEqual(403);
  });
});

describe('404 Error Handler Tests', () => {
  it('should repond with a 404 status on a bad route', async () => {
    //expect a 404 because the route doesn't exsist
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });
});

describe('404 Error Handler Tests', () => {
  it('should repond with a 404 status on a bad method', async () => {
    //expect a 404 because the route doesn't exsist
    const response = await request.patch('/badroute');
    expect(response.status).toEqual(404);
  });
});

describe('500 Error Handler Tests', () => {
  it('should repond with a 500 error status when posting to Users with no body', async () => {
    const response = await request.post('/Users');
    expect(response.status).toEqual(500);
  });
});