var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mainCtrl = require('./controller/mainCtrl.js');
mongoose.connect('mongodb://localhost:27017/eCommerce2');
mongoose.connection.once('open', function(){
  console.log('Connected to MongoDB');
});
var app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/products', mainCtrl.postProducts);
app.get('/api/products', mainCtrl.getProducts);
app.put('/api/products', mainCtrl.updateProducts);
app.delete('/api/products', mainCtrl.removeProducts);

app.listen(5050, function(){
  console.log('Now listening on port: 5050');
});