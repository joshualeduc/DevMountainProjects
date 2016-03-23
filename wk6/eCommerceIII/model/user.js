var mongoose = require('mongoose');
var carts = require('./carts.js')
var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, index: true},
  password: {type: String, required: true},
  cart: [carts],
  orders: []
});
module.exports = mongoose.model('User', userSchema);