const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/paymentController');

// Define a route to create a payment intent
router.post("/createCheckoutSession", paymentController.createCheckoutSession);
module.exports = router;