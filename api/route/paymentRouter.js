
const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/paymentController');

// Route for creating a new order
router.post('/orders', paymentController.createOrder);

// Route for verifying the payment
router.post('/verify', paymentController.verifyPayment);

// Route for getting all orders
router.get('/getOrder', paymentController.getOrder);

module.exports = router;



