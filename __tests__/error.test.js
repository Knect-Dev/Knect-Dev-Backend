'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);


describe('404 Error Handler Tests', () => {
  it('should respond with a 404 status on a bad route', async () => {
    //expect a 404 because the route doesn't exist
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });
});

describe('404 Error Handler Tests', () => {
  it('should respond with a 404 status on a bad method', async () => {
    //expect a 404 because the route doesn't exsist
    const response = await request.patch('/badroute');
    expect(response.status).toEqual(404);
  });
});

