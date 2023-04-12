const mongoose = require('mongoose')

const imgSchema = mongoose.Schema({
    name:String,
    img:{
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('images',imgSchema)