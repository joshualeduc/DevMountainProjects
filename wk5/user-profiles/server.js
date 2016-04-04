var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');
var userCtrl = require('./controllers/userCtrl.js');
var profileCtrl = require('./controllers/profileCtrl.js');
var app = express();
var corsOptions = {
  origin: 'http://localhost:5050'
};

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({secret: config.sessionSecret}));

app.listen(5050, function(){
  console.log('Listening on 5050');
});

app.post('/api/login', userCtrl.login);
app.get('/api/profiles', profileCtrl.getProfiles);
