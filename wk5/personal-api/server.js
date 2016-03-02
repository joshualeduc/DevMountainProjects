var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');
var app = express();

app.use(bodyParser.json());
app.use(middleware.addHeaders);

app.listen(5050, function(){
  console.log('Listening on 5050');
});

app.get('/name', mainCtrl.getName);
app.put('/name', mainCtrl.changeName);
app.get('/location', mainCtrl.getLocation);
app.put('/location', mainCtrl.changeLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/occupations/latest', mainCtrl.getOccupationsLatest);
app.post('/occupations', mainCtrl.addOccupations);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbies/:type', mainCtrl.getHobbiesType);
app.post('/hobbies', mainCtrl.addHobby);
app.get('/skillz', mainCtrl.getSkills);
app.get('/skillz/:experience', mainCtrl.getSkillzExp);
app.post('/skillz', mainCtrl.addSkills);