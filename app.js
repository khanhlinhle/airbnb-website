var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const expRouter = require('./routes/expRoute');
const tagRouter = require('./routes/tagRoute');
const errorRouter = require('./routes/errorRoute');
const mongoose = require("mongoose");
const passport = require("passport");
const { errorHandler } = require('./controllers/errorController');
require("dotenv").config({ path: ".env" });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use(usersRouter);
app.use(reviewRouter);
app.use(expRouter);
app.use(tagRouter);
app.use(errorRouter);
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("connected to database"))

module.exports = app;
