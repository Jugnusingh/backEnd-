const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(process.env.TEST_SECRET_KEY);
const Order = require('../schema/orderSchema'); // Import your Mongoose model for orders

exports.createCheckoutSession = async (req, res) => {
    try {
        const { products, name, email, phone } = req.body; // Assuming frontend sends these fields
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.productName,
                },
                unit_amount: Math.round(product.totalAmount * 100),
            },
            quantity: 1,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        // Save order data to your database
        const order = await Order.create({
            stripeSessionId: session.id,
            paymentStatus: 'pending', // You can set this to 'pending' initially
            productName: products.map(product => product.productName).join(', '), // Combine product names
            userEmail: email,
            userName: name,
            userPhone: phone,
        });

        res.json({ id: session.id, order });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "An error occurred while creating the checkout session." });
    }
};
exports.fetchOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: "An error occurred while fetching orders." });
    }
};