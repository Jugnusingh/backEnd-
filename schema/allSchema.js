const mongoose = require("mongoose")

//Schema
const allSchema = new mongoose.model(
    {
        Title: String,
        Price: Number,
        Description: String,
        Category: String
    },
    {
        Title: String,
        Price: Number,
        Description: String,
        Category: String  
    }
)

//collections
const Playlist = new mongoose.model([,allSchema])

