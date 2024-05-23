const jwt = require('jsonwebtoken');
const express = require('express');
const request = require('supertest');
const authUser = require('./auth.js'); // adjust the path as necessary

const SECRET_KEY = require('../config.js');

describe('authUser Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use((req, res, next) => authUser(req, res, next)); // Use the authUser middleware
    app.get('/test', (req, res) => {
      res.json({ curr_username: req.curr_username, curr_admin: req.curr_admin });
    });
  });

  test('should set curr_username and curr_admin for a valid token', async () => {
    const token = jwt.sign({ username: 'testuser', admin: true }, SECRET_KEY);
    const res = await request(app).get('/test').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ curr_username: 'testuser', curr_admin: true });
  });

  test('should not set curr_username and curr_admin for no token', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  test('should return 401 for an invalid token', async () => {
    const invalidToken = jwt.sign({ username: 'testuser', admin: true }, 'wrong-secret-key');
    const res = await request(app).get('/test').set('Authorization', `Bearer ${invalidToken}`);
    expect(res.status).toBe(401);
  });

  test('should return 401 for a malformed token', async () => {
    const malformedToken = 'this.is.not.a.valid.token';
    const res = await request(app).get('/test').set('Authorization', `Bearer ${malformedToken}`);
    expect(res.status).toBe(401);
  });
});
