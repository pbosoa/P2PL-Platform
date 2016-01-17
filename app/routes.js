var path = require('path');

module.exports = function(app, passport) {
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + './../views/index.html'));
  });

  app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname + './../views/login.html'));
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res){
    res.sendFile(path.join(__dirname + './../views/signup.html'));
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res){
    res.sendFile(path.join(__dirname + './../views/profile.html'));
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //route middleware to make sure user is logged in 

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}