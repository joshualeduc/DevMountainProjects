var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var config = require('./config.js');
var profileCtrl = require('./controllers/profileCtrl.js');
var userCtrl = require('./controllers/userCtrl.js');
var app = express();
var corsOptions = {
  origin: 'http://localhost:5050'
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({secret: config.sessionSecret}));
app.use(express.static(__dirname + '/public'));

app.listen(5050, function(){
  console.log('Listening on 5050');
});

app.post('/api/login', userCtrl.login);
app.get('/api/profiles', profileCtrl.getProfiles);