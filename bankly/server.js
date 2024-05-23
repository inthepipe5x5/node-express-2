/** Server for bank.ly. */


const app = require("./app");
const {PORT} = require('./config')

try {
  app.listen(PORT, () => {
    console.log(`Starting app on port ${PORT}`);
  });
} catch (err) {
  console.error('Error starting server:', err);
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});