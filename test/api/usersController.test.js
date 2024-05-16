const mongoose = require('mongoose');
const request = require('supertest');
const {app, startServer} = require('../../index');

describe('User Controller', () => {
  let server;
  beforeAll(async () => {
    server = startServer();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        "username": "rina32",
        "email": "rina32@gmail.com",
        "password": "123456",
        "bio": "Descripción del perfil de usuario"
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData);

      expect(response.status).toBe(200);
    });
  });
});
