require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("X DB error: ", err.message));
console.log("DB URI:", process.env.DB_URI);