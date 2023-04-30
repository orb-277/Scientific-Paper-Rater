const express = require('express');
const User = require('./models/user');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    // Check if username is already taken
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create new user
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // Save user to database
    await newUser.save();

    // Generate auth token and send it to client
    const token = await newUser.generateAuthToken();
    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;