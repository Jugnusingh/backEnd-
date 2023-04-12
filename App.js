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
const assignmentRoute = require("./api/route/assignment")
const loginRoute = require("./api/route/login")
const ImageRoute = require("./api/route/imageSlider")
const upload = require("./multer/multer")


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
app.use("/assignment", assignmentRoute)
app.use("/login", loginRoute)
app.use("/image", ImageRoute)

// app.use("/upload",uploadRoute)
// app.use("/upload",uploadRoute)

// Default API
app.use("/", (req, res) => {
  res.status(404).json({
    msg: "Error 404 Page is not found"
  })
})


module.exports = app
