const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')   
const userRoutes = require('./routes/user.routes');
const connectDB = require('./db/db');
require('dotenv').config();
module.exports = require("./server")




const http = require('http');


const port = process.env.PORT || 3000;

// Only start the HTTP server if this file is the entry point
if (require.main === module) {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // 

// Or more securely:
app.use(cors({ origin: '*' ,  credentials: true}));

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health', (req, res) => res.json({ ok: true }));
app.use("/users", userRoutes);


// DB Connection
connectDB();




module.exports = app;

