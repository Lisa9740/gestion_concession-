var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Librairie pour crypter des données => ici pour le mot de passe
var bcrypt = require('bcrypt');

// Librairie pour gerer les session utilisateurs
var session = require('express-session')
var app = express();

// utilise des sessions pour le suivi des connexions 
app.use (session ({ 
  secret: 'No pain no gain', 
  resave: true, 
  saveUninitialized: false 
}));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var voituresRouter = require('./routes/voitures');


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connection à la base de données
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Idriss')
  .then(() =>  console.log('connection succesful'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/voitures', voituresRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
