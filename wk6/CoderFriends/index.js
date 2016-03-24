var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var gitHubApi = require('node-github');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('./config.js');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({secret: 'randomString'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.listen(5050, function(){
  console.log('Listening on port 5050');
});

// var github = new GitHubApi({
//   version: "3.0.0"
// });
// github.user.getFollowingFromUser({
//   user: ''
// }, function(err data){
//   err ? res.status(500).send(err) : res.send(data);
// });

var requireAuth = function(req, res,next){
  if(!req.isAuthenticated()){
    return res.status(403).end();
  }
  return next();
}

passport.use(new GitHubStrategy({
    clientID: config.gitId,
    clientSecret: config.gitSecret,
    callbackURL: "http://localhost:5050/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb){
    return cb(null, profile);
  }
));

//From mini project
passport.serializeUser(function(dataToSerialize, cb){
  cb(null, dataToSerialize);
});

passport.deserializeUser(function(dataFrommSessionToPutOnReqDotUser, cb){
  cb(null, dataFrommSessionToPutOnReqDotUser);
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/#/home',
    failureRedirect: '/'
  }),
  function(req, res){
    console.log(req.session);
  });

// app.get('/api/github/following', requireAuth, getFollowing);
