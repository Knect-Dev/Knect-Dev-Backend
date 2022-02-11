"use strict";

const { server } = require("../lib/server");
const supertest = require("supertest");
const res = require("express/lib/response");
const request = supertest(server);

const testUserId = "8DwN0nPhiIgA3MwaRY-U5";
const testAdminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RBZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTY0NDUzODQ1MH0.r_VJjXbatu98qmtVvYJih1K1xJq4OSOEp25qj36Fp8U";

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
  it("should respond with a 500 status on a bad method", async () => {
    //expect a 404 because the route doesn't exist
    const response = await request
      .post(`/Jobs`).send({company: "test", title: "test"})
      .set("Authorization", `Bearer ${testAdminToken}`);
    // console.log(response.body)
    expect(response.status).toEqual(500);
  });
});
