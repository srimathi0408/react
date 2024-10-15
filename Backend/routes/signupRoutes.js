const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

module.exports = router;
