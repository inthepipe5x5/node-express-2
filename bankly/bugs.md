# Bugs Found

## **Bug #1**

_Issue:_
In ../middleware/auth.js/requireAdmin function, it returns an error to the Express error handler if the `curr_admin` property on the request is falsy. Since this is middleware required to patch and delete users, we need to change the way this middleware used in the `'users/:username'` patch route.

_Solution:_

- Removed `requireAdmin` middleware from route as it was too strict; permission handling will be handled in route instead
- Added in route permission checking
  - if the right non-admin tried to change an admin only change (ie. changing the `admin` field), the route will throw a `status: 401, Unauthorized error` as intended.
  - if an invalid field was passed in the request, the route will throw a `status: 400, Bad request error` as intended.

```javascript
router.patch(
  "/:username",
  authUser,
  requireLogin,
  /*requireAdmin REMOVED */
  async function (req, res, next) {
    try {
      /* more code here, added more auth logic below fields variable declaration and User.update function call:*/

      if (
        !Object.keys(fields).some((field) => //use .some() function to ensure that only valid column names are passed in through the request body
          [
            "password",
            "first_name",
            "last_name",
            "email",
            "phone",
            "admin",
          ].includes(field)
        )
      )
        throw new ExpressError("Invalid fields provided in request", 400);
```

## **Bug #2**

_Issue:_
Before the changes made in Bug #1 above, there was no apparent way to patch a user into an admin even as an admin user. After the changes made in Bug #1, admin users can edit existing users to become admins but there are no tests to confirm this.
_Solution:_
Added tests to `__tests__/routes.test.js` to confirm the following route use cases:

- logged in (non-admin) users can patch their stored personal information. App will deny access if not admin/right user
- logged in (non-admin) users cannot patch their own admin status. App will deny access if not admin
- logged in (non-admin) users cannot patch other user details. App will deny access if not admin/right user
- logged in admins can patch admin status on other users. Admins can now grant admin permissions
- Bad requests (ie. non-existent fields) will not be patched and will return a `400 Bad request` error

```javascript
  test("should allow patch as right user but not admin", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u1, first_name: "new-fn1" }); // u1 is right user, non-admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "new-fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
      admin: false,
      password: expect.any(String)
    });
  });

  test("should deny access if not admin/right user", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u2 }); // wrong user!
    expect(response.statusCode).toBe(401);
  });

  test("should patch data if admin", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u3, first_name: "new-fn1", admin: true }); // u3 is admin
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      username: "u1",
      first_name: "new-fn1",
      last_name: "ln1",
      email: "email1",
      phone: "phone1",
      admin: true, //user is now admin
      password: expect.any(String)
    });
  });

  test("should disallow patching non-existent-fields", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u1, kebob: true }); //kebob is non-existent field
    expect(response.statusCode).toBe(400);
  });

  test("should disallow patching not-allowed-fields", async function() {
    const response = await request(app)
      .patch("/users/u1")
      .send({ _token: tokens.u1, admin: true });
    expect(response.statusCode).toBe(401);
  });
```

By changing it to an OR statement, the route logic can handle requests from users with different usernames but with admin privileges. The original logic would only accept requests from admins with the same username as the requested user.

## **Bug #3** authUser function in ./middleware/auth.js uses jwt.decode instead of jwt.verify

_Issue:_
The authUser middleware function uses `jwt.decode()` to decode the JWT token. According to JWT documentation, jwt.decode only decodes the token without verifying its validity. This means the token is not checked for signature correctness, expiration, or other critical security properties. Using jwt.decode here defeats the purpose of authentication because it does not ensure the token is valid and trusted.

_Solution:_
Replaced `jwt.decode` with `jwt.verify`. The `jwt.verify` method not only decodes the token but also checks its validity against the provided secret key, ensuring the token is genuine and has not been tampered with.

## **Bug #4**

_Issue:_
After updating `authUser`, there are no tests specifically for the middleware.
_Solution:_
Added middleware tests to `./__tests__/middleware.tests.js`.

## **Bug #5**

_Issue:_
Non-existing usernames were not being properly handled by the `/GET /:usernames` route as it was not returning a `404 status code` as intended.
_Solution:_

- Added `throw` keyword to the `.get()` method from `./models/users.js`.
- Added logic in the `/GET/:username` and `/DELETE/:username` route to check if user is not falsy before returning results, else it throws a 404 error
- Added two tests that confirmed that neither an admin nor a registered user can search for non-existing usernames
- Added two tests that checks that non-admin users are given `"Unauthorized, 401` response when attempting to delete non-existent user and admins are given a `"No such user, 404` response when attempting the same action

```javascript
/*./bankly/models/user.js/User.update()
Added THROW keyword in conditional statement
*/
    if (!user) {
        throw new ExpressError('No such user', 404);
    }

/*Route logic added to both:
./bankly/routes/user.js/router.get('/:username')
./bankly/routes/user.js/router.delete('/:username')
*/
    let user = await User.get(req.params.username);
    if (user.status_code === 404) throw new ExpressError('No such user', 404)
```

\n
