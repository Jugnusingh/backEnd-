const axios = require('axios');
const Order = require('../schema/orderSchema');
const crypto = require('crypto');

// Your merchant ID
const merchantId = process.env.MERCHANT_ID;
const pa = process.env.VPA;
const googlePayVerificationUrl = process.env.GoogleApiUrl;

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, productIds, title, name, email, phone } = req.body;

    // Generate a unique order ID using timestamp and random string
    const orderTimestamp = new Date().getTime();
    const randomString = crypto.randomBytes(4).toString('hex');
    const orderID = `ORDER_${orderTimestamp}_${randomString}`;
    const currency = 'INR'; // Indian Rupees
    const locale = 'en-IN'; // English (India)

    // Construct your Google Pay session object for UPI payments
    const googlePaySession = {
      apiVersion: 2,
      apiVersionMinor: 0,
      paymentRequest: {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'UPI',
            parameters: {
              pa:pa, // Replace with your UPI Virtual Payment Address
              pn: 'DalalTechnologies', // Replace with recipient's name
            },
          },
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA', 'RUPE'],
            },
          },
        ],
        merchantInfo: {
          merchantId: merchantId, // Include your merchant ID
          merchantName: 'Your Merchant Name',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: String(totalAmount),
          currencyCode: currency,
        },
      },
      onLoadPaymentData: async (paymentData) => {
        try {
          // Logic to verify payment using Google Pay API
          const paymentVerificationResponse = await axios.post(googlePayVerificationUrl, {
            paymentId: paymentData.paymentId,
            orderId: orderID,
          });
          const paymentStatus = paymentVerificationResponse.data.status;

          if (paymentStatus === 'success') {
            // Handle successful payment
            // Update the order status and payment details in your database
            await Order.findOneAndUpdate(
              { _id: orderID, status: 'pending' },
              {
                $set: {
                  paymentId: paymentData.paymentId,
                  productIds,
                  title,
                  amount: totalAmount,
                  status: paymentStatus,
                },
              },
              { new: true }
            );
          } else {
            // Handle failed payment
            handleFailedPayment(orderID, paymentData.paymentId);
          }
        } catch (error) {
          // Handle error
          console.error('Payment verification error:', error);
          handleFailedPayment(orderID, paymentData.paymentId);
        }
      },
    };

    const orderData = {
      id: orderID,
      amount: totalAmount,
      currency: currency,
      locale: locale,
      productIds: productIds,
      title: title,
      name: name,
      email: email,
      phone: phone,
      googlePaySession: googlePaySession,
    };

    res.status(201).json(orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    // Logic to verify payment using Google Pay API
    const paymentVerificationResponse = await axios.post('YOUR_GOOGLE_PAY_VERIFICATION_URL', {
      paymentId,
      orderId,
    });

    const paymentStatus = paymentVerificationResponse.data.status; // Payment status from API

    // Store payment data in the Order schema if payment is successful
    if (paymentStatus === 'success') {
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId, status: 'pending' }, // Update criteria
          {
            $set: {
              paymentId,
              status: paymentStatus,
            },
          },
          { new: true }
        );

        if (!updatedOrder) {
          handleFailedPayment(orderId, paymentId, 'Order not found or already processed'); // Handle if order is not found or already processed
        }
      } catch (error) {
        console.error('Error updating order:', error); // Log the error
        res.status(500).json({ error: 'Failed to update order' }); // Return error response to the client
        return;
      }
    } else {
      handleFailedPayment(orderId, paymentId, 'Payment verification failed'); // Handle failed payment verification
    }

    res.json({ status: paymentStatus }); // Return payment status to the client
  } catch (error) {
    console.error('Error verifying payment:', error); // Log the error
    res.status(500).json({ error: 'Failed to verify payment' }); // Return error response to the client
  }
};

// Function to handle failed payment verification or order processing
const handleFailedPayment = async (orderId, paymentId, errorMessage) => {
  try {
    // Update the order status to 'failed' or take appropriate action
    await Order.findOneAndUpdate(
      { _id: orderId, status: 'pending' },
      {
        $set: {
          status: 'failed',
        },
      },
      { new: true }
    );

    // Log the failed payment or order processing
    console.error(errorMessage, 'for order:', orderId, 'Payment ID:', paymentId);
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
};

  // Controller for getting all orders
  exports.getOrder = async (req, res) => {
    try {
      // Logic to get all orders
      const orders = [
        // Order data
      ];
  
      res.json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ error: 'Failed to get orders' });
    }
  };

