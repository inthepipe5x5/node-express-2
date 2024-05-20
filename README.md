# Bankly

Bankly is a financial system web application designed to manage banking operations efficiently. This README provides simple steps to get the application up and running.

## Getting Started

Follow these instructions to set up and run the Bankly application.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
    ```bash
    cd bankly
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Set up the regular and test databases:
    ```bash
    npm run seed
    ```

4. Run the tests to ensure everything is set up correctly:
    ```bash
    npm test
    ```

5. Start the server:
    ```bash
    npm start
    ```
    *Note: Feel free to change to `nodemon` if desired.*

## Running the Application

After starting the server, the application should be accessible. Ensure all tests pass before using the application.

## Additional Information

- For development, use `nodemon` to automatically restart the server on file changes:
    ```bash
    nodemon start
    ```
