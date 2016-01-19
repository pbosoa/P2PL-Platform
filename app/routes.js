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

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  app.get('/auth/twitter', passport.authenticate('twitter', {scope: 'email'}));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  app.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

  app.get('/connect/facebook/callback', passport.authorize('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

};

  //route middleware to make sure user is logged in 

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}