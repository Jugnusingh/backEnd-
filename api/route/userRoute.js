

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../schema/userSchema');

const router = express.Router();

// Handle user registration
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    // Create the user in the database
    const user = new User({
      username,
      password: hash
    });
    await user.save();

    res.send('User registered successfully');
  });
});

module.exports = router;
