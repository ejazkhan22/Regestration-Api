const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')   
const userRoutes = require('./routes/user.routes');
const connectDB = require('./db/db');
require('dotenv').config();

// server.js
require('dotenv').config();
const http = require('http');
const server = require('./app');

const port = process.env.PORT || 3000;

// Only start the HTTP server if this file is the entry point
if (require.main === module) {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // ✅ Allow all origins

// Or more securely:
app.use(cors({ origin: '*' }));

// Routes

app.use("/users", userRoutes);

// DB Connection
connectDB();




module.exports = app;
module.exports=server
