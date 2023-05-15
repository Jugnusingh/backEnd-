const express = require('express');
const router = express.Router();
const Contact = require('../../schema/contactSchema');

router.post('/', async (req, res) => {
  const { username, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ username, email, subject, message });
    await newContact.save();

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
