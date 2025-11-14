const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve html

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Define Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollno: String
});

const User = mongoose.model("User", UserSchema);

// Route to save form data
app.post("/submit", async (req, res) => {
  const { name, email, rollno } = req.body;
  const newUser = new User({ name, email, rollno });
  await newUser.save();
  res.json({ message: "Data saved successfully!" });
});

// Route to get all users (with optional search)
app.get("/users", async (req, res) => {
  const search = req.query.search;
  let users;
  if (search) {
// Case-insensitive search by name or email or rollno
    users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { rollno: { $regex: search, $options: "i" } }
      ]
    });
  } else {
    users = await User.find();
  }
  res.json(users);
});

// Route to delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user"});
 }
});

//Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

