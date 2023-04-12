const mongoose = require("mongoose");
const ImageSlider = mongoose.Schema({
    Title:String,
    ImgUrl:String
})
module.exports= mongoose.model("slider",ImageSlider)