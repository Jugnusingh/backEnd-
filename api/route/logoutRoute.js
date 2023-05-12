const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  req.session.userId = null;
  res.json({ message: 'Logout successful.' });
});

module.exports = router;
