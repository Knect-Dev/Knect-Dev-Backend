'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

// {
//   "user": {
//       "firstName": "testUser",
//       "lastName": "testUser",
//       "password": "$2b$10$HS44X6ex0tmoV0ssSnIafeErAoWjdZNZLGL7XQp5Y4KYgBaz1Lkg6",
//       "email": "testUser@test.com",
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ0NTM4NDE1fQ.ixFkzaqQDwyR1We3dEUl4ODd9vmSZRjtSf57VbddfXI",
//       "id": "8DwN0nPhiIgA3MwaRY-U5",
//       "role": "user"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ0NTM4NDE1fQ.ixFkzaqQDwyR1We3dEUl4ODd9vmSZRjtSf57VbddfXI"
// }

// {
//   "user": {
//       "firstName": "testAdmin",
//       "lastName": "testAdmin",
//       "password": "$2b$10$D.mkkP6HPfW0PebgpmRR.eQLumPXDBCTirhgtcB5pSDsaaPIHJVBS",
//       "email": "testAdmin@test.com",
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U",
//       "id": "hUzLa7Tfcs7mGnz13aqJ3",
//       "role": "user"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U"
// }

let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ0NTM4NDE1fQ.ixFkzaqQDwyR1We3dEUl4ODd9vmSZRjtSf57VbddfXI';
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U';
// let jobId;
let jobId = "g8zu_e34k0tPYSjYLI0Ft";

describe('Job Route Tests', () => {
  xit('should create a record when using POST for user', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompany',
      'title': 'testJobTitle',
      'location': 'testLocation',
      'appliedDate': Date.now(),
      'applied': false,
      'technologies': ['Javascript', 'React', 'CSS'],
      'openPositions': 3,
      'interview': false,
      'contacts': 'James',
      'notes': 'ask James about the work environment',
    }
    let response = await request.post('/Jobs').send(job).set({ authorization: userToken });
    expect(response.status).toEqual(201);
    // console.log(response.body);
    jobId = response.body.id;
  });

  xit('should create a record when using POST and generate non-required document keys ', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompanyRequired',
      'title': 'testJobTitleRequired',
    }

    let response = await request.post('/Jobs').send(job).set({ authorization: userToken });
    console.log(response.body);
    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.owner).toEqual('testUser@test.com');
    expect(response.body).toHaveProperty('location');
    // expect(response.body).toHaveProperty('appliedDate'); //null default values don't create property
    expect(response.body).toHaveProperty('applied');
    expect(response.body).toHaveProperty('technologies');
    // expect(response.body).toHaveProperty('openPositions'); //null default values don't create property
    expect(response.body).toHaveProperty('interview');
    expect(response.body).toHaveProperty('contacts');
    expect(response.body).toHaveProperty('notes');
  });
  xit('should REJECT admin attempt to POST and generate job', async () => {
    // create one job record
    let job = {
      'company': 'testJobCompanyRequired',
      'title': 'testJobTitleRequired',
    }
    let response = await request.post('/Jobs').send(job).set({ authorization: adminToken });
    expect(response.status).toEqual(500);
  });
  xit('should GET a Job record created by any user', async () => {
    // read one job record
    // user should only be able to do this to their own job
    //admin should be able to access any job
    const response = await request.get(`/Jobs/${jobId}`).set({ authorization: adminToken });
    expect(response.status).toEqual(200);
  });
  xit('should GET a Job record that user owns', async () => {
    const response = await request.get(`/Jobs/${jobId}`).set({ authorization: userToken });
    expect(response.status).toEqual(200);
  });
  xit('should read all Job records when using GET no other search params ', async () => {
    // TODO: FIX
    // return a list of all companies
    //user/admin should only be able to do this to their own jobs
    //admin should be able to access any job
    const response = await request.get(`/Jobs`).set({ authorization: adminToken });
    console.log(response);
    expect(response.status).toEqual(200);
  });
  xit('should update a record when using PUT and an Id ', async () => {
    // update job record
    // user should only be able to do this to their own job
    let updatedJob = {
      'title': 'newTestJobTitleRequired',
    }
    const response = await request.put(`/Jobs/${jobId}`).set({ authorization: userToken }).send(updatedJob);
    console.log("PUT RESPONSE BODY: ", response.body);
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
    console.log("PUT RESPONSE BODY: ", response.body);
    expect(response.status).toEqual(500);
  });
  xit('should succesfully DELETE a record users own record', async () => {
    // user/admin should only be able to do this to their own job
    const response = await request.delete(`/Jobs/${jobId}`).set({ authorization: userToken });
    expect(response.status).toEqual(200);
  });
  xit('should succesfully DELETE a record using ADMIN credentials', async () => {
    // user/admin should only be able to do this to their own job
    const response = await request.delete(`/Jobs/${jobId}`).set({ authorization: adminToken });
    expect(response.status).toEqual(200);
  });
});
