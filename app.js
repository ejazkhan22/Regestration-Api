const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')   
const userRoutes = require('./routes/user.routes');
const connectDB = require('./db/db');
require('dotenv').config();
module.exports = require("./server")






// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // ✅ Allow all origins

// Or more securely:
app.use(cors({ origin: '*' }));

// Routes
app.get('/health', (req, res) => res.json({ ok: true }));
app.use("/users", userRoutes);

// DB Connection
connectDB();




module.exports = app;

