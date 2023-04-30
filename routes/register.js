const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Register route
router.post('/', async (req, res) => {
  try {
    // Check if username is already taken
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email : req.body.email,
      password: req.body.password
    });

    // Save user to database
    var suc = await newUser.save();
    console.log(suc); 
    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;