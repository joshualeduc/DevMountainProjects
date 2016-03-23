var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  products: [{
    item : productSchema,
    quantity : {type: Number, required: true, min 1}
  }],
  ordered: {type: Data, default: new Date()}
})
module.exports = mongoose.model('Order', orderSchema);