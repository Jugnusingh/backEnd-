const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');

// Create a new instance of Razorpay with your Razorpay API credentials
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Endpoint for creating an order
router.post('/orders', async (req, res) => {
  try {
    const {productId, amount, currency } = req.body;

    // Generate a unique receipt ID using the crypto module
    const receipt = crypto.randomBytes(4).toString('hex');

    const options = {
      amount: amount * 100, // Razorpay accepts the amount in paise, so multiply by 100 for rupees
      currency: currency,
      receipt: receipt,
      productId: productId,
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong!' });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Endpoint for verifying the payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

module.exports = router;
