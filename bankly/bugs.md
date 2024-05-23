
# Bugs Found

## **Bug #1**

*Issue:*
In ../middleware/auth.js/requireAdmin function, it returns an error to the Express error handler if the curr_admin property on the request is falsy. Since this is middleware required to patch and delete users, we need to change the way this middleware works to also ensure that it first checks if the req.username matches the username in the URL params before checking the curr_admin property.
*Solution:*
The new code changes the logic to check the request using an OR statement to check if the username matches the route parameters.

```javascript
    if (req.curr_username === req.params.username || req.curr_admin) {
    // Allow access
    } else {
    // Return an error
    }
```

## **Bug #2**

*Issue:*
There is no apparent way to patch a user into an admin. Without admin privileges, the user cannot perform certain actions such as patch or delete, but the app does not allow a way to make a user into an admin or create new admins. Consequently, how will user data be patched or users be deleted?
*Solution:*
Change the first if statement in ./routes/user.js/router.patch('/:username') to use an OR operator instead of an AND operator. The logic to check request credentials should look like the following:

```javascript
    if (!req.curr_admin || req.curr_username !== req.params.username) {
    // Return an error
    } else {
    // Allow access
    }
```

By changing it to an OR statement, the route logic can handle requests from users with different usernames but with admin privileges. The original logic would only accept requests from admins with the same username as the requested user.

## **Bug #3** authUser function in ./middleware/auth.js uses jwt.decode instead of jwt.verify

*Issue:*
The authUser middleware function uses jwt.decode to decode the JWT token. According to JWT documentation, jwt.decode only decodes the token without verifying its validity. This means the token is not checked for signature correctness, expiration, or other critical security properties. Using jwt.decode here defeats the purpose of authentication because it does not ensure the token is valid and trusted.

*Solution:*
Replace jwt.decode with jwt.verify. The jwt.verify method not only decodes the token but also checks its validity against the provided secret key, ensuring the token is genuine and has not been tampered with.

\n