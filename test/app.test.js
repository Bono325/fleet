import supertest from "supertest";
import request from "supertest";
import app from "../backend/app.js"

  describe('GET /', () => {
    test('responds with API is running', async () => {
      const response = await request(app).get('/');
      expect('API is runnning!!');
    });
  });

  describe('Use /company', () => {
    // add new driver
    // add new vehicle 
    // set new trip/job
    // assisgn driver to trip/job
  });

  describe('Use /user', () => {

    // Passes need to setup test database 
    describe("Given a new user is registring.", () => {
      // test("should respond with status code of 201", async ()=> {
      //   const response = await request(app).post("/api/v1/user").send({
      //     name: "Travis",
      //     email: "valar@mail.com",
      //     password: "password123"
      //   })
      //   expect(response.statusCode).toBe(201)
      })
      // should save the email and password to database
      
    });

    describe("Given a email and password", () => {
      // should save the email and password to database
      // should respond with a json object containing the user id
      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/v1/user/auth").send({
          email: "valar@mail.com",
          password: "password123"
        })
        expect(response.statusCode).toBe(200)
      })
      test("should specify json int content type header", async () => {
        const response = await request(app).post("/api/v1/user/auth").send({
          email: "valar@mail.com",
          password: "password123"
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })

    describe("when the email and password is invalid and/or missing", () => {
      test("should respond with a status code 400", async () => {
        const response = await request(app).post("/api/v1/user/auth").send({
          email: "user@admin.com"
        })
        expect(response.statusCode).toBe(401)
      })
    })

  // });
