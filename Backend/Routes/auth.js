// backend/routes/auth.js (example)
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User mongoose model

router.post('/register', async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;
  try {
    // Basic validation
    if (!name || !email || !mobileNumber || !password) {
      return res.status(400).json({ message: "Please fill out all fields." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Create new user
    const newUser = new User({ name, email, mobileNumber, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
