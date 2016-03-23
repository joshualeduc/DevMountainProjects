var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
  title: {type: String, index: true, required: true, unique: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, min: 0}
})
module.exports = mongoose.model('Product', productSchema);