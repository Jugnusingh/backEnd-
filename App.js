const express = require("express");
const session = require('express-session');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require('crypto');
// const multer = require('multer');

//---------------Mulater---------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Environment variables
dotenv.config();

// Middlewares
const productRoute = require("./api/route/productRoute");
const adminlogin = require("./api/route/adminRoute");
const ImageRoute = require("./api/route/imageSlider");
const categoryRouter = require('./api/route/categoryroute');
const contactRouter = require("./api/route/mailerRoute");
const blogRoutes = require('./api/route/blogRoute');
const paymentRouter = require('./api/route/paymentRouter');

// Database connect
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("error", (error) => {
  console.log("Error DB is not connected");
});
mongoose.connection.on("connected", (connected) => {
  console.log("Data Base is connected");
});
// Generate a secret key for sessions
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // Generate a 32-byte (256-bit) random string in hexadecimal format
};
// Session configuration
app.use(session({
  secret: generateSecretKey(), // Replace with your secret key for session encryption
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // For development only, set it to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day in this case)
  }
}));
// API
app.use('/uploads', express.static('uploads'));
app.use("/product", productRoute);
app.use('/admin', adminlogin);
app.use("/image", ImageRoute);
app.use('/categories', categoryRouter);
app.use("/Contact", contactRouter);
app.use('/BlogData', blogRoutes);
app.use('/pay', paymentRouter);

// Default API
app.use("/", (req, res) => {
  res.status(404).json({
    msg: "Error 404 Page is not found"
  });
});

module.exports = app;

