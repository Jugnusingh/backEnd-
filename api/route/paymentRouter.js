
const express = require('express');
const paymentController = require('../../controller/paymentController');
const router = express.Router();

// Create a new order
router.post('/orders', paymentController.createOrder);

// Verify the payment
router.post('/verify', paymentController.verifyPayment);

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Unable to retrieve orders' });
  }
});

module.exports = router;
