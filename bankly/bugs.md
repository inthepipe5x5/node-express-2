### Bug #1
*Issue:*
*Solution:*
### Bug #2
*Issue:*
*Solution:*
### Bug #3 authUser function in ./middleware/auth.js uses jwt.decode instead of jwt.verify
*Issue:*
The authUser middleware function uses jwt.decode to decode the JWT token. According to JWT documentation, jwt.decode only decodes the token without verifying its validity. This means the token is not checked for signature correctness, expiration, or other critical security properties. Using jwt.decode here defeats the purpose of authentication because it does not ensure the token is valid and trusted.

*Solution:*
Replace jwt.decode with jwt.verify. The jwt.verify method not only decodes the token but also checks its validity against the provided secret key, ensuring the token is genuine and has not been tampered with.