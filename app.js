'use strict';
require('dotenv').config();
require('./connection');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swig = require('swig');
// const validator = require('express-validator');
var loginRouter = require('./src/v1/login/loginRoute.js');
var dashboardRouter = require('./src/v1/dashboard/dashboardRoute.js');
var usersRouter = require('./src/v1/users/usersRoute.js');

var app = express();

// view engine setup
app.engine('html', swig.renderFile)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(validator());

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);


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
