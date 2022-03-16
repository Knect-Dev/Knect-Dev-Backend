'use strict';

require('dotenv').config();
const { server } = require('../lib/server');
const { db } = require('../lib/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

let userToken;
let adminToken;
let userID;

const testUser = {
  firstName: 'goliath',
  lastName: 'miguel-reyes',
  password: 'test',
  email: 'goliath@doge.com'
}

const anotherTestUser = {
  firstName: 'bruiser',
  lastName: 'miguel-reyes',
  password: 'test',
  email: 'bruiser@doge.com'
}

describe('User Route Tests', () => {
  it('should create test accounts for user routes', async () => {
    const userUser = await request.post('/signup').send({
      firstName: "userUser",
      lastName: "userUser",
      password: "password",
      email: "userUser@test.com"
    });

    const userAdmin = await request.post('/signup').send({
      firstName: "userAdmin",
      lastName: "userAdmin",
      password: "password",
      email: "userAdmin@test.com",
      role: "admin"
    });

    userToken = userUser.body.user.token;
    userID = userUser.body.user.id;
    adminToken = userAdmin.body.user.token;
  });


  it('should not be allowed to create a user when using POST ', async () => {
    // create one company record
    const userResponse = await request.post('/Users').set('Authorization', `Bearer ${userToken}`).send(testUser);
    expect(userResponse.status).toEqual(404);
    
    const adminResponse = await request.post('/Users').set('Authorization', `Bearer ${adminToken}`).send(testUser);
    expect(adminResponse.status).toEqual(404);
    // user and admin should be able to do this
  });

  it('should read a record when using GET and an Id ', async () => {
    
    //user-findOne
    const response = await request.get(`/Users/${userID}`).set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.firstName).toEqual('userUser');
    
    //admin-findOne
    const adminResponse = await request.get(`/Users/${userID}`).set('Authorization', `Bearer ${adminToken}`);

    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.firstName).toEqual('userUser');
  });

  // return a list of all companies
  it('should read all records when using GET no other search params ', async () => {
    //User-findAll
    const response = await request.get('/Users').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(500);
    // admin-findAll
    const adminResponse = await request.get('/Users').set('Authorization', `Bearer ${adminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
  });

  
  // update company record
  it('should update a record when using PUT and an Id ', async () => {
    //user-put
    const response = await request.put(`/Users/${userID}`).set('Authorization', `Bearer ${userToken}`).send({
      email: 'testemail@doge.com',
    });
    expect(response.status).toEqual(202);
    expect(response.body.email).toEqual('testemail@doge.com');
    // admin-put
    const adminResponse = await request.put(`/Users/${userID}`).set('Authorization', `Bearer ${adminToken}`).send({
      email: 'testUser@test.com',
    });
    expect(adminResponse.status).toEqual(202);
    expect(adminResponse.body.email).toEqual('testUser@test.com');
  });

    // update company record
    it('should throw not authorized, when useing wrong token', async () => {
      //user-put
      const response = await request.put(`/Users/${userID}`).set('Authorization', `Bearer userToken`).send({
        email: 'testemail@doge.com',
      });
      expect(response.status).toEqual(403);
    });


  //delete a record
  let userCreatedResponse;

  it('User should not be able to delete another user', async () => {
    userCreatedResponse = await request.post('/signup').send(anotherTestUser);
  //user-delete
    const response = await request.delete(`/Users/${userCreatedResponse.body.user.id}`).set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(403);
  });

    //delete a record
  it('User should be able to delete themselves', async () => {
    //user-delete
      const response = await request.delete(`/Users/${userCreatedResponse.body.user.id}`).set('Authorization', `Bearer ${userCreatedResponse.body.token}`);
      expect(response.status).toEqual(200);
  });

  it('Admin should be able to delete a user when using DELETE and an Id', async () => {

    const adminUserCreatedResponse = await request.post('/signup').send(anotherTestUser);

    console.log(adminUserCreatedResponse.body.user.id)
    //admin-delete
    const response = await request.delete(`/Users/${adminUserCreatedResponse.body.user.id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
  });
});
