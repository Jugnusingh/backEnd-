const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const { products } = req.body;
        console.log(products,"product data ")

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
        console.log(lineItems,"product data hai")

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "An error occurred while creating the checkout session." });
    }
};
