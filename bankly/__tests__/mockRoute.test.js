const httpMock = require("node-mocks-http");
const createToken = require('../helpers/createToken')
const jwt = require("jsonwebtoken");
const {authUser} = require('../middleware/auth')

const HTTP_OK = 200;
const HTTP_UNAUTHORIZED = 401;

// create the request using the "node-mocks-http" library. This is really just
// creating a mock endpoint.
function createTestingRequest(token) {
  return httpMock.createRequest({
    method: "GET",
    url: "/test",
    body: { _token: token },
  });
};

// Create the response using "node-mocks-http", but also pass 
// it the request object so that we can implement your logic.
function createTestingResponse(req) {
  const res = httpMock.createResponse({
      eventEmitter: require('events').EventEmitter
  });

  const { curr_admin, curr_username } = req;
  if (!curr_admin && !curr_username) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  } else {
    return res.json({
      curr_username: req.curr_username,
      curr_admin: req.curr_admin,
    });
  }
}


// Create test cases to loop over and send requests with.
// "tests" is an array of objects, with each object representing one of your test // cases.
const tests = [
  {
    testName: "should set curr_username and curr_admin for a valid token",
    username: "un3",
    admin: true,
    token: createToken("un3", true),
    want: {
      body: { curr_username: "un3", curr_admin: true },
      status: HTTP_OK,
    }
  },
  {
    testName: "should not set curr_username and curr_admin for no token",
    username: "",
    admin: false,
    token: null,
    want: {
      body: { message: "Unauthorized", status: HTTP_UNAUTHORIZED },
      status: HTTP_UNAUTHORIZED,
    }
  },
  {
    testName: "should return 401 for an invalid token",
    username: "un3",
    admin: true,
    token: jwt.sign({ username: "un3", admin: true }, "wrong-secret-key"),
    want: {
      body: { message: "Unauthorized", status: HTTP_UNAUTHORIZED },
      status: HTTP_UNAUTHORIZED,
    }
  },
  {
    testName: "should return 401 for a malformed token",
    username: "un3",
    admin: true,
    token: "this.is.not.a.valid.token",
    want: {
      body: { message: "Unauthorized", status: HTTP_UNAUTHORIZED },
      status: HTTP_UNAUTHORIZED,
    }
  },
];

describe("authUser Middleware", () => {
  test("test that authUser middleware behaves as expected", async () => {
    for (let testCase of tests) {
      console.log("*****", testCase.testName, "*****")
      const req = createTestingRequest(testCase.token);

      // Since authUser does not actually use the response object, we can just 
      // mock it for now. Same thing with "next." This allows authUser to
      // inspect the token on the request and act accordingly.
      authUser(req, jest.fn(), jest.fn());
      const res = createTestingResponse(req);

      expect(JSON.parse(res._getData())).toEqual(testCase.want.body);
      expect(res.statusCode).toBe(testCase.want.status);

      const { curr_username, curr_admin } = req;

      if (res.statusCode === HTTP_OK) {
        // Reaching here means that the token was valid and these values should have been set on the request object.
        expect(curr_username).toEqual(testCase.username);
        expect(curr_admin).toEqual(testCase.admin);
      } else {
        // Indicates that the token was invalid and these values were rightfully never set.
        expect(curr_username).toBeUndefined();
        expect(curr_admin).toBeUndefined();
      }
    }
  });
});