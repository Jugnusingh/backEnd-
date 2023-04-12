const mongoose = require("mongoose");


const assignmentSchema = mongoose.Schema(
    {
        Title: String,
        Image: String,
        Price: Number,
        Description: String,
        Category: String
    }
)

module.exports =mongoose.model("assignments", assignmentSchema)