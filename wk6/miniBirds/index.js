var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoJS = require('mongojs');

var app = express();
var db = mongoJS('birds', ['sightings']);

app.use(bodyParser.json);
app.use(cors());

app.listen(5050, function(){
  console.log('Now listening on port: 5050');
});

app.get('/api/sighting', function(req, res){
  var query = {};
  if(req.query.bird){
    query.bird = {name: req.query.bird};
  }
  if(req.query.region){
    query.region = req.query.region;
  }
  if(req.query.id){
    query._id = mongoJS.ObjectId(req.query.id);
  }

  db.sightings.find(query, function(err,data){
    if(err) {
      res.status(500).json(err);
    }else {
      res.json(data);
    }
  });
});

app.post('/api/sighting', function(req, res){
  db.sighting.save(req.body, function(err, data){
    if(err) {
      return res.status(500).json(err);
    }else {
      return res.json(data);
    }
  });
});

app.put('/api/sighting', function(req, res){
  if(!req.query.id){
    return res.status(418).send('request query \'id\' required');
  }
  db.sightings.findAndModify({
    query: {
      _id: mongoJS.ObjectId(req.query.id)
    },
    update: {
      $set: req.body
    }
  },
  function(err, data){
    console.log(err, data);
    if(err){
      return res.status(500).json(err);
      res.json(response);
    }
  }
  });
});

app.delete('/api/sighting', function(req,res){

});

// // Kendall's answers
// var express = require("express")
// var bodyParser = require("body-parser")
// var cors = require("cors")
// var mongojs = require("mongojs")

// var app = express();
// app.use(bodyParser.json());

// var nodePort = 3000;

// var db = mongojs("bird-sightings");
// var collection = db.collection("sightings");

// app.get("/api/sighting", function(req, resp) {
//   collection.find({name: req.query.name}, function(err, sighting) {
//     return resp.status(200).send(sighting);
//   });
// });

// app.post("/api/sighting", function(req, resp) {
//   console.log(req.body);
//   collection.insert(req.body, function(err, r) {
//     return resp.status(200).send(r);
//   });
// });

// // app.put("/api/sighting", function(req, resp) {
// // });

// // POST /api/sighting
// // GET /api/sighting?region=america&species=redrobin
// // PUT /api/sighting?id=09evasd09jhahs9d8h9vh
// // DELETE /api/sighting?id=09evasd09jhahs9d8h9vh

// console.log("Listening...")
// app.listen(nodePort);
