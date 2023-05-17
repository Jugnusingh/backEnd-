const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
// const multer = require('multer');

//---------------Mulater---------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000"
}));


//Middlewares
app.use(bodyParser.json())
const productRoute = require("./api/route/productData")
const adminlogin = require("./api/route/adminRoute")
// const loginRoute = require("./api/route/loginRoute")
// const logoutRoute = require("./api/route/logoutRoute")
// const userRoute = require("./api/route/userRoute")
const ImageRoute = require("./api/route/imageSlider")
// const upload = require("./multer/multer")
const categoryRouter = require('./api/route/categoryroute');
const contactRouter = require("./api/route/contactRoute")
// const blogRoutes = require('./api/route/blogRoute');



// const { urlencoded } = require("body-parser")
//mongodb+srv://Gazal:Gazal%4017flt@cluster0.gu7qtpr.mongodb.net/DalalTechnologies
// mongodb://localhost:27017/DalalTechnologies
// Database connect
mongoose.connect("mongodb+srv://Gazal:Gazal%4017flt@cluster0.gu7qtpr.mongodb.net/DalalTechnologies", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.connection.on("error", (error) => {
  console.log("Error DB is not connected")
})
mongoose.connection.on("connected", (connected) => {
  console.log("DB is connected")
})

// API
app.use('/uploads',express.static('uploads'))
app.use("/product", productRoute)
// app.use("/assignment", assignmentRoute)
app.use('/admin',adminlogin)
// app.use("/login", loginRoute)
// app.use("/logout", logoutRoute)
// app.use("/User", userRoute)
app.use("/image", ImageRoute)
app.use('/categories', categoryRouter);
app.use("/contact",contactRouter)
// app.use('/blog', blogRoutes);



// Default API
app.use("/", (req, res) => {
  res.status(404).json({
    msg: "Error 404 Page is not found"
  })
})


module.exports = app
