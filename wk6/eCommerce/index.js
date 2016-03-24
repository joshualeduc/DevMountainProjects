var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongo = require('mongojs');

var app = express();
var db = mongo('ecommerce', ['eCommerce1']);
app.use(cors());
app.use(bodyParser.json());
app.listen(5050, function(){
  console.log('Now listening on port: 5050');
});

app.post('/api/products', function(req, res){
  db.products.save(req.body, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else {
      return res.json(resposne);
    }
  });
});
app.get('/api/products', function(req, res){
  var query = {};
  if(req.query.id){
    query._id = mongo.ObjectId(req.query.id);
  }
  if(req.query.title){
    query.title = req.query.title;
  }
  db.products.find(query, function(error, response){
    if(error){
      res.status(500).json(error);
    }else {
      res.json(response);
    }
  });
});
app.put('/api/products', function(req, res){
  if(!req.query.id){
    return res.status(400).send('id qeury needed');
  }
  var query = {
    _id: mongo.ObjectId(req.query.id)
  };
  db.products.update(query, req.body, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else {
      return res.json(response);
    }
  });
});

app.delete('/api/products', function(req, res){
  if(!req.query.id){
    return res.status(400).send('id query needed');
  }
  var query = {
    _id: mongo.ObjectId(req.query.id)
  };
  db.products.remove(query, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else {
      return res.json(response);
    }
  });
});