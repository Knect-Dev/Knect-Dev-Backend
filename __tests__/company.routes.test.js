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

const userTestCompanyObj = {
  name: 'userTestCompany',
  leader: 'mya',
  product: 'borks',
}

const adminTestCompanyObj = {
  name: 'adminTestCompany',
  leader: 'poncho',
  product: 'cronchies',
}

describe('Companies Route Tests', () => {

  let testId;
  let testIdAdmin;

  it('should create test accounts for company route', async () => {
    const companyUser = await request.post('/signup').send({
      name: "companyUser",
      password: "password",
      email: "companyUser@test.com"
    });

    const companyAdmin = await request.post('/signup').send({
      name: "companyAdmin",
      password: "password",
      email: "companyAdmin@test.com",
      role: "admin"
    });
    userToken = companyUser.body.user.token;
    adminToken = companyAdmin.body.user.token;
  });
  it('should create a record when using POST ', async () => {
    // create one company record
    const userResponse = await request.post('/Companies').set('Authorization', `Bearer ${userToken}`).send(userTestCompanyObj);
    testId = userResponse.body.id;
    expect(userResponse.status).toEqual(201);
    
    const adminResponse = await request.post('/Companies').set('Authorization', `Bearer ${adminToken}`).send(adminTestCompanyObj);
    testIdAdmin = adminResponse.body.id;
    expect(adminResponse.status).toEqual(201);
    // user and admin should be able to do this
  });

  it('should read a record when using GET and an Id ', async () => {
    //user-findOne
    const response = await request.get(`/Companies/${testId}`).set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual('userTestCompany');
    //admin-findOne
    const adminResponse = await request.get(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${adminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.name).toEqual('adminTestCompany');
  });

  // return a list of all companies
  it('should read all records when using GET no other search params ', async () => {
    //User-findAll
    const response = await request.get('/Companies').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
    // admin-findAll
    const adminResponse = await request.get('/Companies').set('Authorization', `Bearer ${adminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
  });

  
  // update company record
  it('should update a record when using PUT and an Id ', async () => {
    //user-put
    const response = await request.put(`/Companies/${testId}`).set('Authorization', `Bearer ${userToken}`).send({
      product: 'cat tower',
    });
    expect(response.status).toEqual(202);
    expect(response.body.product).toEqual('cat tower');
    // admin-put
    const adminResponse = await request.put(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${adminToken}`).send({
      name: 'cat nip',
    });
    expect(adminResponse.status).toEqual(202);
    expect(adminResponse.body.name).toEqual('cat nip');
  });


  //delete a record
  it('User should not be able to delete a record when using DELETE and an Id', async () => {
  //user-delete
    const response = await request.delete(`/Companies/${testId}`).set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toEqual(500);
  });

  it('Admin should be able to delete a record when using DELETE and an Id', async () => {
    //admin-delete
    const response = await request.delete(`/Companies/${testId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
  });

  it('Admin should be able to delete a record when using DELETE and an Id', async () => {
    //admin-delete again
    const response = await request.delete(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
  });
});

