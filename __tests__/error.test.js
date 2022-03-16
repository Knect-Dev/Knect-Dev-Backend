"use strict";

require('dotenv').config();
const { server } = require("../lib/server");
const { db } = require('../lib/models');
const supertest = require("supertest");
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("404 Error Handler Tests", () => {

  it("should respond with a 404 status on a bad route", async () => {
    //expect a 404 because the route doesn't exist
    const response = await request.get("/badroute");
    expect(response.status).toEqual(404);
  });
});

describe("404 Error Handler Tests", () => {
  it("should respond with a 404 status on a bad method", async () => {
    //expect a 404 because the route doesn't exist
    const response = await request.patch("/badroute");
    expect(response.status).toEqual(404);
  });
});

describe("500 Error Handler Tests", () => {

  let adminToken;

  it('should create test accounts for job route', async () => {
    const errorAdmin = await request.post('/signup').send({
      firstName: "errorAdmin",
      lastName: "errorAdmin",
      password: "password",
      email: "errorAdmin@test.com",
      role: "admin"
    });
    adminToken = errorAdmin.body.user.token;
  });
  it("should respond with a 500 status on a bad method", async () => {
    //expect a 404 because the route doesn't exist
    const response = await request
      .post(`/Jobs`).send({company: "test", title: "test"})
      .set("Authorization", `Bearer ${adminToken}`);
    // console.log(response.body)
    expect(response.status).toEqual(500);
  });
});
