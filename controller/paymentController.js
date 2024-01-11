const axios = require('axios');
const ccavutil = require('../nonsameless/ccavutil.js');
const accessCode = process.env.CCAVENUE_ACCESS_CODE;
const workingKey = process.env.WORKING_KEY;
const ccAvenueURL = process.env.CCAVENUE;
const Merchant = process.env.CCAVENUE_MERCHANT_ID;
const Order = require('../schema/orderSchema.js');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const paymentRequest = async function (request, response) {
  try {
    const requestData = request.body;
    // Validate the required fields
    if (!requestData.order_id || !requestData.amount || !requestData.userId) {
      throw new Error('Missing required fields in the request.');
    }
    // Save the data to the database with initial order status as "pending"
    const newOrder = new Order({
      ...requestData,
      order_status: 'pending',
    });

    await newOrder.save();
    const modifiedRequestData = {
      merchant_id: Merchant,
      order_id: requestData.order_id,
      currency: 'INR',
      amount: requestData.amount,
      redirect_url: 'https://waveart.in:4000/pay/ccavResponseHandler',
      cancel_url: 'https://waveart.in/shop',
      language: 'EN',
    };

    const queryString = Object.entries(modifiedRequestData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    const encRequest = ccavutil.encryptData(queryString, workingKey);
    const formbody = `<form id="nonseamless" method="post" name="redirect" action="${ccAvenueURL}/transaction/transaction.do?command=initiateTransaction">
      <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
      <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
      <script language="javascript">document.redirect.submit();</script>
    </form>`;

    response.send(formbody);
  } catch (error) {
    console.error('Error processing payment request:', error.message);
    response.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

const paymentResponse = async function (request, response) {
  try {
    const encryptedResponse = request.body.encResp;
    const decryptedResponse = ccavutil.decryptData(encryptedResponse, process.env.WORKING_KEY);
    const responseParams = decryptedResponse.split('&');
    const jsonResponse = {};
    responseParams.forEach((param) => {
      const [key, value] = param.split('=');
      jsonResponse[key] = value;
    });

    // Update the order status in the database
    await Order.updateOne({ order_id: jsonResponse.order_id }, { order_status: jsonResponse.order_status });

    // Redirect the user to the download page
    response.redirect('https://waveart.in/download');
  } catch (error) {
    console.error('Error processing payment response:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderData = await Order.find(); // Using async/await for better error handling

    if (!orderData || orderData.length === 0) {
      console.log('No orders found');
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orderData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { paymentRequest, paymentResponse, getOrder };
