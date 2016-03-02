var occupations = require('../models/occupations');
var hobbies = require('../models/hobbies');
var skillz = require('../models/skillz');
var name = {'name': 'Donald Duck'};
var location = {'location': 'Provo'};

var exports = module.exports = {
  getName: function(req, res){
    res.status(200).json(name);
  },
  changeName: function(req, res){
    name = {'name': req.body.name};
    res.status(200).json(name);
  },
  getLocation: function(req, res){
    res.status(200).json(location);
  },
  changeLocation: function(req, res){
    location = {'location': req.body.location};
    res.status(200).json(location);
  },
  getOccupations: function(req, res){
    if(req.query.order === 'asc'){
      res.status(200).json(occupations.sort());
    }else if(req.query.order === 'desc'){
      res.status(200).json(occupations.sort().reverse());
    }else{
      res.status(200).json(occupations);
    }
  },
  getOccupationsLatest: function(req, res){
    res.status(200).json(occupations[(occupations.length-1)]);
  },
  addOccupation: function(req, res){
    occupations.push({'occupations': req.body.occupations});
    res.status(200).json(occupations);
  },
  getHobbies: function(req, res){
    res.status(200).json(hobbies);
  },
  getHobbiesType: function(req, res){
    var filteredHobbies = [];
    for(var i = 0; i < hobbies.length; i++){
      if(hobbies[i].type == req.params.type){filteredHobbies.push(hobbies[i]);}
    }
    res.status(200).json(filteredHobbies);
  },
  addHobbies: function(req, res){
    hobbies.push({'name': req.body.name, 'type': 'past'});
    res.status(200).json(hobbies);
  },
  getSkillz: function(req, res){
    res.status(200).json(skillz);
  },
  getSkillzExp: function(req, res){
    var skillzId = req.params.experience;
    for(var i = 0; i < skillz.length; i++){
      if(skillz[i].experience === parseInt(skillzId)){
        res.status(200).json(skillz[i]);
      }
    }
  },
  addSkills: function(req, res){
    skillz.push(req.body);
    res.status(200).json(skillz);
  }
}; 