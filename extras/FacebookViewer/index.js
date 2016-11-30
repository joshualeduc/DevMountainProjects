//*****Step 1*****
var express = require('express')
,   app = express()
,   session = require('express-session')
,   passport = require('passport')
,   FacebookStrategy = require('passport-facebook').Strategy
,   fbSecrets = require('./fbSecrets');

app.use(session({secret: 'randomString'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: fbSecrets.clientID,
  clientSecret: fbSecrets.clientSecret,
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
  return done(null, profile);
}));

//*****Step 2*****
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), 
  function(req, res){
    res.redirect('/me');
  });

//*****Step 3*****
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

//*****Step 4*****
app.get('/me', function(req, res){
  console.log(req.user);
  res.status(200).send(req.user);
});

app.listen(8080, function(){
  console.log('Listen on port 8080');
});