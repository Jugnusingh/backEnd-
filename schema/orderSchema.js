const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    productIds: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    stripePaymentIntentId: {
        type: String, // Use this field to store the Stripe PaymentIntent ID
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
