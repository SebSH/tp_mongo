const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let fishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true  
  },
  status: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Fish', fishSchema);