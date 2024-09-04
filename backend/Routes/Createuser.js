// Createuser.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = 'rbeegedfgernvaeovn';

router.post('/Signup', [
  // Validate email format
  body('email').isEmail(),
  // Validate password length
  body('password', 'Incorrect password').isLength({ min: 5 }),
], async (req, res) => {
  try {
    // Destructure values from req.body
    const { name, password, email, location } = req.body;

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    await User.create({ name, password: hashedPassword, email, location });

    // Respond with success
    res.json({ success: true });
  } catch (error) {
    // Log the error
    console.error(error);

    // Respond with an error message
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/Login', [
  // Validate email format
  body('email').isEmail(),
  // Validate password length
  body('password', 'Incorrect password').isLength({ min: 5 }),
], async (req, res) => {
  try {
    // Destructure values from req.body
    const { email, password } = req.body;

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Incorrect password' });
    }

    // Generate a JWT token
    const authToken = jwt.sign({ user: user.id }, jwtSecret);

    // Respond with success and the authToken
    res.json({ success: true, authToken });
  } catch (error) {
    // Log the error
    console.error(error);

    // Respond with an error message
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
