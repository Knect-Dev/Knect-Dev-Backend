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

//create two test accounts, admin and user
let userToken;
let adminToken;

// let jobId;
let jobId;
let jobId2;

describe('Job Route Tests', () => {
  it('should create test accounts for job route', async () => {
    const jobUser = await request.post('/signup').send({
      firstName: "jobUser",
      lastName: "jobUser",
      password: "password",
      email: "jobUser@test.com"
    });

    const jobAdmin = await request.post('/signup').send({
      firstName: "jobAdmin",
      lastName: "jobAdmin",
      password: "password",
      email: "jobAdmin@test.com",
      role: "admin"
    });
    userToken = jobUser.body.user.token;
    adminToken = jobAdmin.body.user.token;
  });

  it('should create a record when using POST for user', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompany',
      'title': 'testJobTitle',
      'location': 'testLocation',
      'appliedDate': Date.now(),
      'applied': false,
      'openPositions': 3,
      'interview': false,
      'contacts': 'testContact',
      'notes': 'testNote',
    }
    let response = await request.post('/Jobs').send(job).set({ authorization: userToken });
    let response2 = await request.post('/Jobs').send(job).set({ authorization: userToken });
    expect(response.status).toEqual(201);

    jobId = response.body.id;
    jobId2 = response2.body.id;
  });

  it('should create a record when using POST and generate non-required document keys ', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompanyRequired',
      'title': 'testJobTitleRequired',
    }

    let response = await request.post('/Jobs').send(job).set({ authorization: userToken });

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body).toHaveProperty('location');
    expect(response.body).toHaveProperty('appliedDate');
    expect(response.body).toHaveProperty('applied');
    expect(response.body).toHaveProperty('technologies');
    expect(response.body).toHaveProperty('openPositions');
    expect(response.body).toHaveProperty('interview');
    expect(response.body).toHaveProperty('contacts');
    expect(response.body).toHaveProperty('notes');
  });
  it('should REJECT admin attempt to POST and generate job', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompanyRequired',
      'title': 'testJobTitleRequired',
    }
    let response = await request.post('/Jobs').send(job).set({ authorization: adminToken });
    expect(response.status).toEqual(500);
  });
  it('should GET a Job record created by any user', async () => {
    // read one job record
    // user should only be able to do this to their own job
    //admin should be able to access any job
    const response = await request.get(`/Jobs/${jobId}`).set({ authorization: adminToken });
    expect(response.status).toEqual(200);
  });
  it('should GET a Job record that user owns', async () => {
    const response = await request.get(`/Jobs/${jobId}`).set({ authorization: userToken });
    expect(response.status).toEqual(200);
  });
  it('should read all Job records when using GET no other search params ', async () => {
    // TODO: FIX
    // return a list of all companies
    //user/admin should only be able to do this to their own jobs
    //admin should be able to access any job
    const response = await request.get(`/Jobs`).set({ authorization: adminToken });
    expect(response.status).toEqual(200);
  });
  it('should update a record when using PUT and an Id ', async () => {
    // update job record
    // user should only be able to do this to their own job
    let updatedJob = {
      'title': 'newTestJobTitleRequired',
    }
    const response = await request.put(`/Jobs/${jobId}`).set({ authorization: userToken }).send(updatedJob);
    expect(response.status).toEqual(202);
  });


  xit('should REJECT a request with a field that does not exist in the Job schema when using PUT and an Id', async () => {
    //TODO: we are not throwing an error when trying to make this request.
    // update job record
    // user should only be able to do this to their own job
    let updatedJob = {
      'fakeField': 'newValue',
    }


    const response = await request.put(`/Jobs/${jobId}`).set({ authorization: userToken }).send(updatedJob);
    
    expect(response.status).toEqual(404);
  });
  it('should succesfully DELETE a record users own record', async () => {
    // user/admin should only be able to do this to their own job
    const response = await request.delete(`/Jobs/${jobId}`).set({ authorization: userToken });
    expect(response.status).toEqual(200);
  });
  it('should succesfully DELETE a record using ADMIN credentials', async () => {
    // user/admin should only be able to do this to their own job
    console.log("ID", jobId)
    const response = await request.delete(`/Jobs/${jobId2}`).set({ authorization: adminToken });
    expect(response.status).toEqual(200);
  });
});
