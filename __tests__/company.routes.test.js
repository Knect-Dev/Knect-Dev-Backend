'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

const testUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ0NTM4NDE1fQ.ixFkzaqQDwyR1We3dEUl4ODd9vmSZRjtSf57VbddfXI';

const testAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U';

const testCompanyObj = {
  name: 'testCompany',
  leader: 'bruiser',
  product: 'borks',
}

describe('Companies Route Tests', () => {

  let testId;
  let testIdAdmin;
  
  it('should create a record when using POST ', async () => {
    // create one company record
    const userResponse = await request.post('/Companies').set('Authorization', `Bearer ${testUserToken}`).send(testCompanyObj);
    testId = userResponse.body.id;
    expect(userResponse.status).toEqual(201);
    
    const adminResponse = await request.post('/Companies').set('Authorization', `Bearer ${testAdminToken}`).send(testCompanyObj);
    testIdAdmin = adminResponse.body.id;
    expect(adminResponse.status).toEqual(201);
    // user and admin should be able to do this
  });

  it('should read a record when using GET and an Id ', async () => {
    //user-findOne
    const response = await request.get(`/Companies/${testId}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].name).toEqual('testCompany');
    //admin-findOne
    const adminResponse = await request.get(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${testAdminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body[0].name).toEqual('testCompany');
  });

  // return a list of all companies
  it('should read all records when using GET no other search params ', async () => {
    //User-findAll
    const response = await request.get('/Companies').set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
    // admin-findAll
    const adminResponse = await request.get('/Companies').set('Authorization', `Bearer ${testAdminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
  });

  
  // update company record
  it('should update a record when using PUT and an Id ', async () => {
    //user-put
    const response = await request.put(`/Companies/${testId}`).set('Authorization', `Bearer ${testUserToken}`).send({
      product: 'test bork',
    });
    expect(response.status).toEqual(202);
    expect(response.body.product).toEqual('test bork');
    // admin-put
    const adminResponse = await request.put(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${testAdminToken}`).send({
      name: 'test ork',
    });
    expect(adminResponse.status).toEqual(202);
    expect(adminResponse.body.name).toEqual('test ork');
  });


  //delete a record
  it('User should not be able to delete a record when using DELETE and an Id', async () => {
  //user-delete
    const response = await request.delete(`/Companies/${testId}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(500);
  });

  it('Admin should be able to delete a record when using DELETE and an Id', async () => {
    //admin-delete
    const response = await request.delete(`/Companies/${testId}`).set('Authorization', `Bearer ${testAdminToken}`);
    expect(response.status).toEqual(200);
  });

  it('Admin should be able to delete a record when using DELETE and an Id', async () => {
    //admin-delete again
    const response = await request.delete(`/Companies/${testIdAdmin}`).set('Authorization', `Bearer ${testAdminToken}`);
    expect(response.status).toEqual(200);
  });
});

