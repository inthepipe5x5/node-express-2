// Set ENV VAR to test before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db");
const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { authUser, requireAdmin, requireLogin } = require("../middleware/auth");

// tokens for our sample users
const tokens = {};

/** before each test, insert un1, un2, and un3  [un3 is admin] */
beforeEach(async function () {
    async function _pwd(password) {
      return await bcrypt.hash(password, 1);
    }
  
    let sampleUsers = [
      ["un1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
      ["un2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
      ["un3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true],
    ];
  
    for (let user of sampleUsers) {
      tokens[user[0]] = createToken(user[0], user[6]);
    }
  
    // Define the test route inside beforeEach to reset it before each test
    app.get("/test", authUser, (req, res, next) => {
      const { curr_admin, curr_username } = req;
      if (!curr_admin && !curr_username) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res.json({
          curr_username: req.curr_username,
          curr_admin: req.curr_admin,
        });
      }
    });
  
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({ message: err.message });
    });
  });

describe("authUser Middleware", () => {
  test("should set curr_username and curr_admin for a valid token", async () => {
    const res = await request(app).get("/test").send({ _token: tokens.un3 });
    expect(res.body).toEqual({ curr_username: "un3", curr_admin: true });
    expect(res.status).toBe(200);
});

  test("should not set curr_username and curr_admin for no token", async () => {
    const res = await request(app).get("/test");
    expect(res.body).toEqual({
      message: "Not Found",
      status: 404,
    });
    expect(res.status).toBe(404);
  });

  test("should return 401 for an invalid token", async () => {
    const invalidToken = jwt.sign(
      { username: "u3", admin: true },
      "wrong-secret-key"
    );

    const res = await request(app).get("/test").send({ _token: invalidToken });
    expect(res.body).toEqual({ message: "Not Found", status: 404 });
    expect(res.status).toBe(404);
  });

  test("should return 401 for a malformed token", async () => {
    const malformedToken = "this.is.not.a.valid.token";
    const res = await request(app)
      .get("/test")
      .send({ _token: malformedToken });
    expect(res.body).toEqual({ message: "Not Found", status: 404 });
    expect(res.status).toBe(404);
  });
});

afterEach(async function () {
  await db.query("DELETE FROM users");
});

afterAll(function () {
  db.end();
});
