'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const request = supertest(server);

const testUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjQ0NTU0Mjg1fQ.6pbxe68028KwU81WvNy1sIn3DNGEbcNZk8yO6r5yN4g';

const testAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U';

const testUserId = 'gH3wpp_yYXJSVI7BEVuPT';

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

  it('should not be allowed to create a user when using POST ', async () => {
    // create one company record
    const userResponse = await request.post('/Users').set('Authorization', `Bearer ${testUserToken}`).send(testUser);
    expect(userResponse.status).toEqual(404);
    
    const adminResponse = await request.post('/Users').set('Authorization', `Bearer ${testAdminToken}`).send(testUser);
    expect(adminResponse.status).toEqual(404);
    // user and admin should be able to do this
  });

  it('should read a record when using GET and an Id ', async () => {
    
    //user-findOne
    const response = await request.get(`/Users/${testUserId}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body[0].firstName).toEqual('testUser');
    
    //admin-findOne
    const adminResponse = await request.get(`/Users/${testUserId}`).set('Authorization', `Bearer ${testAdminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body[0].firstName).toEqual('testUser');
  });

  // return a list of all companies
  it('should read all records when using GET no other search params ', async () => {
    //User-findAll
    const response = await request.get('/Users').set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(500);
    // admin-findAll
    const adminResponse = await request.get('/Users').set('Authorization', `Bearer ${testAdminToken}`);
    expect(adminResponse.status).toEqual(200);
    expect(adminResponse.body).toBeDefined();
    expect(adminResponse.body.length > 1).toBe(true); // Assumes more than one entry in our company DB
  });

  
  // update company record
  it('should update a record when using PUT and an Id ', async () => {
    //user-put
    const response = await request.put(`/Users/${testUserId}`).set('Authorization', `Bearer ${testUserToken}`).send({
      email: 'testemail@doge.com',
    });
    expect(response.status).toEqual(202);
    expect(response.body.email).toEqual('testemail@doge.com');
    // admin-put
    const adminResponse = await request.put(`/Users/${testUserId}`).set('Authorization', `Bearer ${testAdminToken}`).send({
      email: 'testUser@test.com',
    });
    expect(adminResponse.status).toEqual(202);
    expect(adminResponse.body.email).toEqual('testUser@test.com');
  });

    // update company record
    it('should throw not authorized, when useing wrong token', async () => {
      //user-put
      const response = await request.put(`/Users/${testUserId}`).set('Authorization', `Bearer testUserToken`).send({
        email: 'testemail@doge.com',
      });
      expect(response.status).toEqual(403);
    });


  //delete a record
  let userCreatedResponse;

  it('User should not be able to delete another user', async () => {
    userCreatedResponse = await request.post('/signup').send(anotherTestUser);
  //user-delete
    const response = await request.delete(`/Users/${userCreatedResponse.body.user.id}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(response.status).toEqual(500);
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
    const response = await request.delete(`/Users/${adminUserCreatedResponse.body.user.id}`).set('Authorization', `Bearer ${testAdminToken}`);
    expect(response.status).toEqual(200);
  });
});
