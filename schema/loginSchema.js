const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    password: String,
    username: String
    
})

module.exports = new mongoose.model("login",loginSchema)