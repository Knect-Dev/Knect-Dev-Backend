'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

let testUserToken;
let testUserId;


// delete test user after authorization tests are complete
afterAll(async () => {
  await request.delete(`/Users/${testUserId}`).set({ authorization: testUserToken});
});

describe('Basic Authentication Testing', () => {
  
  it('should create a new user when POSTing to /signup route with proper fields filled out', async () => {
    const user = {
      "firstName": "authTest",
      "lastName": "authTest",
      "password": "password",
      "email": "authTest@test.com",
    };

    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.user.id).toBeTruthy();
    expect(response.body.user.firstName).toEqual('authTest');
    expect(response.body.user.lastName).toEqual('authTest');
    expect(response.body.user.email).toEqual('authTest@test.com');
    expect(response.body.user.role).toEqual('user');
    expect(response.body.user.token).toBeTruthy();
  });
  it('should respond with an error when POSTing to /signup route without EMAIL', async () => {
    // missing email
    const user = {
      "firstName": "authTest",
      "lastName": "authTest",
      "password": "password",
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(500);
  });
  it('should respond with an error when POSTing to /signup route without FIRSTNAME', async () => {
    // missing firstName
    const user = {
      "lastName": "authTest",
      "password": "password",
      "email": "authTest1@test.com",
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(500);
  });
  it('should respond with an error when POSTing to /signup route without LASTNAME', async () => {
    // missing lastName
    const user = {
      "firstName": "authTest",
      "password": "password",
      "email": "authTest2@test.com",
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(500);
  });
  it('should respond with an error when POSTing to /signup route without PASSWORD', async () => {
    // missing password
    const user = {
      "firstName": "authTest",
      "lastName": "authTest",
      "email": "authTest3@test.com",
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(500);
  });
  it('should respond with an error when POSTing to /signup route a DUPLICATE email', async () => {
    // missing password
    const user = {
      "firstName": "authTest",
      "lastName": "authTest",
      "password": "password",
      "email": "authTest@test.com",
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(500);
  });
  it('should reject a user when POSTing to /signin route with the WRONG credentials', async () => {
    const response = await request.post('/signin').set({ authorization: 'Basic cmQsc3dWRONGsCREDENTIALsSTRINGzvcmQ=' });
    expect(response.status).toEqual(403);
  });
  it('should sign in a user when POSTing to /signin route with PROPER credentials', async () => {
    const response = await request.post('/signin').set({ authorization: 'Basic YXV0aFRlc3RAdGVzdC5jb206cGFzc3dvcmQ=' });
    expect(response.status).toEqual(200);
    console.log(response.body.user[0]);
    expect(response.body.user[0].token).toBeTruthy();
    testUserToken = response.body.user[0].token;
    testUserId = response.body.user[0].id;
  });
});
