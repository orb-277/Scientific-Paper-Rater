const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  try {
    // Authenticate user credentials
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    const isValidPassword = await user.checkPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate auth token and send it to client
    const token = await user.generateAuthToken();
    res.json({ auth_token : token,privilege : user.privilege_level });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;