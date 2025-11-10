require('dotenv').config();
require('mongoose');
require('./studentModel');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.DB_URI || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve html

//MongoDB connection
require("./dbConnect.mongodb.js");

// Routes
const studentRoutes = require('../routes/studentRoutes');
app.use('/api/students', studentRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`PORT: 3000`);
})
