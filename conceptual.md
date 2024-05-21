### What is a JWT?

A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

### What is the signature portion of the JWT? What does it do?

The signature portion of a JWT is the third part of the token, which is created using the encoded header, the encoded payload, a secret, and the algorithm specified in the header. It ensures the token's integrity by allowing the receiver to verify that the payload has not been altered. This is done by recalculating the signature and comparing it to the one included in the JWT.

### If a JWT is intercepted, can the attacker see what's inside the payload?

Yes, if a JWT is intercepted, the attacker can see the contents of the payload since JWTs are encoded but not encrypted by default. This means the payload is in a readable format (base64 URL-encoded) and can be decoded to reveal its contents. Sensitive information should not be included in a JWT payload unless it is encrypted.

### How can you implement authentication with a JWT? Describe how it works at a high level.

To implement authentication with a JWT, follow these high-level steps:

1. **User Login**: The user sends their credentials (e.g., username and password) to the server.
2. **Token Issuance**: If the credentials are valid, the server creates a JWT containing user-specific information and signs it with a secret key.
3. **Token Transmission**: The server sends the JWT back to the client.
4. **Token Storage**: The client stores the JWT (usually in local storage or a cookie).
5. **Authenticated Requests**: For subsequent requests, the client includes the JWT in the HTTP headers (typically the Authorization header).
6. **Token Verification**: The server verifies the JWT's signature to ensure it is valid and not tampered with. If valid, the server processes the request.

### Compare and contrast unit, integration, and end-to-end tests.

- **Unit Tests**:
  - Focus on testing individual components or functions in isolation.
  - Aim to ensure that each unit of the codebase works as expected.
  - Fast to run and easy to write.
  - Example: Testing a single function that calculates the sum of two numbers.

- **Integration Tests**:
  - Test the interaction between multiple components or systems.
  - Aim to ensure that integrated parts of the application work together correctly.
  - Slower than unit tests due to more complex setup.
  - Example: Testing a function that relies on a database query.

- **End-to-End (E2E) Tests**:
  - Simulate real user scenarios to test the entire application flow.
  - Aim to ensure that the entire system, including front-end and back-end, works correctly from the user's perspective.
  - Slowest to run and can be complex to write and maintain.
  - Example: Testing the complete login process, from entering credentials to accessing a user dashboard.

### What is a mock? What are some things you would mock?

A mock is an object that simulates the behavior of real objects in controlled ways. Mocks are used in testing to isolate the unit of code being tested and to verify interactions with dependencies.

Some things you would mock include:
- External APIs or services.
- Databases or data sources.
- Network calls.
- File systems.
- Time-dependent functions.

### What is continuous integration?

Continuous Integration (CI) is a development practice where developers integrate code into a shared repository frequently, usually multiple times a day. Each integration is automatically verified by running tests, ensuring that the new code does not break the existing codebase. CI helps in detecting issues early, improving code quality, and reducing the time to release new features.

### What is an environment variable and what are they used for?

An environment variable is a dynamic value that can affect the behavior of running processes on a computer. Environment variables are used to configure application settings without hardcoding them into the application's codebase. They are commonly used to manage:
- Database connection strings.
- API keys and secrets.
- Configuration settings for different environments (development, testing, production).

### What is TDD? What are some benefits and drawbacks?

Test-Driven Development (TDD) is a software development approach where tests are written before writing the actual code. The TDD cycle involves writing a failing test, writing the minimum amount of code to pass the test, and then refactoring the code.

**Benefits**:
- Ensures code coverage and robustness.
- Encourages better design and modularity.
- Provides documentation through tests.

**Drawbacks**:
- Can be time-consuming initially.
- May be challenging to write tests for some features.
- Requires discipline and experience to write effective tests.

### What is the value of using JSONSchema for validation?

JSONSchema provides a standardized way to validate JSON data structures. The value of using JSONSchema includes:
- Ensuring data integrity by validating incoming and outgoing data against a predefined schema.
- Reducing errors and improving data quality.
- Providing clear documentation of the expected data format.
- Enabling automatic generation of validation code and UI forms.

### What are some ways to decide which code to test?

- **Critical functionality**: Focus on testing the most critical parts of your application first.
- **Complex code**: Test code that has complex logic or many dependencies.
- **Frequently used code**: Test parts of the codebase that are used frequently by users.
- **Error-prone areas**: Test areas where bugs have been found in the past or where failures would have significant impact.
- **Edge cases**: Test boundary conditions and edge cases to ensure robustness.

### What does `RETURNING` do in SQL? When would you use it?

The `RETURNING` clause in SQL is used to return values from rows that are affected by an `INSERT`, `UPDATE`, or `DELETE` statement. This is particularly useful when you need to get the values of specific columns, such as an auto-generated primary key, immediately after modifying the data.

Example:
```sql
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com') RETURNING id;
```

### What are some differences between Web Sockets and HTTP?

- **Communication Model**:
  - **HTTP**: Follows a request-response model where the client initiates a request, and the server responds. Each request is independent.
  - **WebSockets**: Provides a full-duplex communication channel over a single, long-lived connection. Both client and server can send and receive messages independently.

- **Use Cases**:
  - **HTTP**: Suitable for traditional web applications where the client needs to fetch data or send data to the server occasionally.
  - **WebSockets**: Ideal for real-time applications such as chat applications, live notifications, and online gaming where low latency and real-time communication are critical.

- **Performance**:
  - **HTTP**: Overhead due to the need to establish a new connection for each request.
  - **WebSockets**: Lower overhead as the connection is established once and remains open, reducing the need for repeated handshakes.

- **State**:
  - **HTTP**: Stateless protocol where each request is independent and does not retain user state between requests.
  - **WebSockets**: Can maintain stateful interactions, allowing for continuous data exchange and session management over a persistent connection.