const mongoose = require("mongoose");
const ImageSlider = mongoose.Schema({
    Title: {
        type: String,
        
    },
    Description: {
        type: String,
      
    },
    ImgUrl: {
        type: String,
        
    }
})
module.exports= mongoose.model("slider",ImageSlider)
