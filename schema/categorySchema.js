const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    id:String,
    type: String,
    
  }
});

module.exports = mongoose.model('categories', categorySchema);
