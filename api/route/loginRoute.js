const express = require('express');
const bcrypt = require('bcrypt');
// const User = require('../../schema/userSchema');
const router = express.Router();
const requiresLogin = require('./requiresLogin');
router.get('/protected', requiresLogin, (req, res) => {
    res.send('You are logged in');
  });
router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
          }

          req.session.userId = user._id;
          res.json({ message: 'Login successful.' });
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

module.exports = router;
