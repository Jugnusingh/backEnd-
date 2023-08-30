// Import the Stripe library and configure it with your secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.createPaymentSession = async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.dish,
                    images: [product.imgdata]
                },
                unit_amount: product.price * 100,
            },
            quantity: product.qnty
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "An error occurred while creating the checkout session." });
    }
};
