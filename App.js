const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv=require("dotenv");
// const multer = require('multer');

//---------------Mulater---------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000"
}));


//environment variables
dotenv.config();


//Middlewares
app.use(bodyParser.json())
const productRoute = require("./api/route/productData")
const adminlogin = require("./api/route/adminRoute")
const ImageRoute = require("./api/route/imageSlider")
const categoryRouter = require('./api/route/categoryroute');
const contactRouter = require("./api/route/mailerRoute")
const blogRoutes = require('./api/route/blogRoute')
const paymentRouter =require('./api/route/paymentRouter')


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

// API
app.use('/uploads',express.static('uploads'))
app.use("/product", productRoute)
app.use('/admin',adminlogin)
app.use("/image", ImageRoute)
app.use('/categories', categoryRouter);
app.use("/Contact",contactRouter)
app.use('/Blog', blogRoutes);
app.use('/pay', paymentRouter);

// Default API
app.use("/", (req, res) => {
  res.status(404).json({
    msg: "Error 404 Page is not found"
  })
})


module.exports = app
