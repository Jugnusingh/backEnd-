
const express = require('express');
const paymentController = require('../../controller/paymentController');
const router = express.Router();

// Create a new order
router.post('/orders', paymentController.createOrder);

// Verify the payment
router.post('/verify', paymentController.verifyPayment);

// Get all orders
router.get('/orders', paymentController.getOrder);


module.exports = router;
