var mongoose = require('mongoose');
var cartSchema = new mongoose.Schema({
  products: [{
    item: {type: Schema.types.ObjectId, ref: 'product', required: true},
    quantity: {type: Number, min: 1}
  }]
})
module.exports = mongoose.model('Cart', cartSchema);