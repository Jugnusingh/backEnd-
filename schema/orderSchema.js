const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  order_id: String,
  order_status: String,
  tracking_id: String,
  title: String,
  productID: String,
  name: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
