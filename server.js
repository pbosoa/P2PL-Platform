var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require ('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

// set-up for express application
app.use(express.static(path.join(__dirname, 'views')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(cookieParser('secretKey'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//required for passport
app.use(session({secret: 'thesecret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));

//routes
require('./app/routes.js')(app, passport);

//launch
app.listen(1337);
console.log('Magic on port 1337');