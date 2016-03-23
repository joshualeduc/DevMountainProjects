var Product = require('../model/product.js').model;
var Order = require('../model/order.js');
var User = require('../model/user.js');

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
  },
  postOrder: function(req, res){
    var userId = req.params.userId;
    User.findById(userId, function(error, data){
      return error ? res.sendStatus(500).send(error) : null;
      var userObj = data;
      var userOrder = {};
      userOrder.products = userObj.cart;
      userOrder.userId = userId;
      var newOrder = new Order(userOrder);
      newOrder.save(function(error, data){
        return error ? res.sendStatus(500).send(error) : null;
        userObj.cart = [];
        userObj.orders.push(mongoose.Types.ObjectId(result._id));
        userObj.save(function(error, data){
          return error ? res.sendStatus(500).send(error) : res.send(data);
        })
      })
    })
  },
  getOrder: function(req, res){
    Order.find(req.query, function(error, data){
      return error ? res.sendStatus(500).send(error) : res.send(data);
    });
  },
  postCart: function(req, res){
    User.findByIdAndUpdate(req.params.user_id, {$push: req.body}, function(error, data){
      return error ? res.status(500).send(error) : res.send(data);
    });
  },
  putCart: function(req, res){
    User.findById(req.params.user_id, function(error, data){
      error ? res.status(500).send(error) : null;
      var myUser = data;
      var qty = req.query.qty / 1;
      var foundItem = -1;
      myUser.cart.forEach(function(cartItem, index){
        (cartItem._id.toString() === req.query.itmId) ? foundItem = index : null;
      })
      if (foundItem >= 0){
        (qty === 0) ? myUser.cart.splice(foundItem, 1) : myUser.cart[foundItem].qty = qty;
      }
      saveUser(myUser, req,res);
    })
    function saveUser(userToSave, req,res){
      userToSave.save(function(error, data){
        error ? res.status(500).send(error) : res.send(data);
      })
    };
  },
  getUser: function(req, res){
    User.findById(req.params.user_id).populate('cart/product').exec()
      .then(function(data){
        return res.send(data);
      }, function(error){
        return res.status(500).send(error);
      })
  }
};