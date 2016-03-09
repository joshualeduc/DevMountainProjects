var Product = require('../model/product.js');

module.exports = {
  getProducts: function(req, res){
    var query = {};
    req.query.title ? query.title = req.query.title : null;
    req.query.description ? query.description = req.query.description : null;
    req.query.price ? query.price = req.query.price : null;
    Product.find(query, function(error, data){
      error ? res.status(500).send(error) : res.send(data);
    });
  },
  postProducts: function(req, res){
    var product = new Product(req.body);
    product.save(function(error, data){
      return error ? res.status(500).send(error) : res.send(data);
    });
  },
  updateProducts: function(req, res){
    Product.findByIdAndUpdate(req.query.id, req.body, function(error, data){
      return error ? res.status(500).send(error) : res.send(data);
    });
  },
  removeProducts: function(req, res){
    Product.findByIdAndRemove(req.query.id, function(error, data){
      return error ? res.status(500).send(error) : res.send(data);
    });
  }
};