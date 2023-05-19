const mongoose = require("mongoose");
// Blog Schema model
const BlogSchema = new mongoose.Schema({
  Title: {
    type: String,
    // required: true
  },
  Content: {
    type: String,
    // required: true
  },
  Image: {
    type: String,
    // required: true
  },
  date: { type: Date, default: Date.now } // Added date field
});

module.exports = mongoose.model('Blog', BlogSchema);