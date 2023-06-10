
const Razorpay = require('razorpay');
const Order = require('../schema/orderSchema');
const crypto= require('crypto')

// Initialize Razorpay with your API credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { amount, currency, productIds, title } = req.body;
        // Generate a unique receipt ID using the crypto module
        const receipt = crypto.randomBytes(4).toString('hex');
        const options = {
            amount: amount * 100, // Razorpay accepts the amount in paise, so multiply by 100 for rupees
            currency: currency,
            receipt: receipt,
        };
        razorpay.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Something went wrong!' });
            }
            // Store the order data in the database
            const newOrder = new Order({
                title: title,
                productIds: productIds,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                razorpayOrderId: order.id,
            });
            await newOrder.save();
            res.status(200).json(order);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};
// Verify the payment
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');
        if (generatedSignature === razorpay_signature) {
            // Update the order status in the database
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (order) {
                order.status = 'paid';
                await order.save();
            }
            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
};
module.exports = {
    createOrder,
    verifyPayment
};
