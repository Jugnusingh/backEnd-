const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Contact = require('../../schema/MailerSchema');

router.post('/', async (req, res) => {
  const { username, email, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or the appropriate port for your email provider
    secure: false, // false if you're using a non-SSL/TLS connection
    requireTLS:true,
    auth: {
      user: 'abhisingh1906@gmail.com',
      pass: 'type your password',
    },
  });

  // Prepare the email
  const mailOptions = {
    from: 'abhisingh1906@gmail.com',
    to: 'jugnu908@gmail.com',
    subject: `Contact Form Submission - ${username}`,
    text: `Name: ${username}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    // Save the contact form submission to the database
    const contact = new Contact({
      username,
      email,
      subject,
      message,
    });
    await contact.save();
    res.status(200).json({ message: 'Email sent and contact form submission saved' });
  } catch (error) {
    console.log('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

module.exports = router;
