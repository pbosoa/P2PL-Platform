var path = require('path');

module.exports = function(app, passport) {
  
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + './../public/views/index.html'));
  });

  app.post('/login', function(req, res, next){
    if (!req.body.email || !req.body.password){
      return res.json({error: 'Email and password required'});
    }
    passport.authenticate('local-login', function(err ,user, info){
      if (err){
        return res.json(err);
      }
      if (user.error){
        return res.json({error: user.error});
      }
      req.login(user, function(err){
        if(err){
          return res.json(err);
        }
        return res.json({redirect:'/profile'});
      });
    })(req, res);
  });

  app.post('/signup', function(req, res, next){
    if (!req.body.email || !req.body.password){
      return res.json({error: 'Email and password required'});
    }
    passport.authenticate('local-signup', function(err, user, info){
      if (err){
        return res.json(err);
      }
      if (user.error){
        return res.json({error: user.error});
      }
      req.login(user, function(err){
        if (err){
          return res.json(err);
        }
        return res.json({redirect: '/profile'});
      });
    })(req, res);
  });

  app.post('/logout', function(req, res){
    req.logout();
    res.json({redirect: '/logout'});
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

  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  app.get('/api/userData', isLoggedInAjax, function(req, res){
    console.log('hello');
    console.log(req.user);
    return res.json(req.user);
  });

  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + './../public/views/index.html'));
  });

};

function isLoggedInAjax(req, res, next){
  if (!req.isAuthenticated()){
    return res.json({redirect: '/login'});
  }
  else {
    next();
  }
}

//route middleware to make sure user is logged in 

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}