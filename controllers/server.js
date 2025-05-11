// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

// Only start the HTTP server if this file is the entry point
if (require.main === module) {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
