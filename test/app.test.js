import supertest from "supertest";
import request from "supertest";
import app from "../backend/app.js"

describe('GET /', () => {
    test('responds with API is running', async () => {
      const response = await request(app).get('/');
      expect('API is runnning!!');
    });
  });