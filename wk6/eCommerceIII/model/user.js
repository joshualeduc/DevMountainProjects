var mongoose = require('mongoose');
var cart = require('./cart.js')
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, index: true},
  password: {type: String, required: true},
  cart: [cart],
  orders: []
});
module.exports = mongoose.model('User', userSchema);