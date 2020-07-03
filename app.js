var express = require('express');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const expRouter = require('./routes/expRoute');
const tagRouter = require('./routes/tagRoute');
const errorRouter = require('./routes/errorRoute');
const fakerRouter = require('./routes/fakeRoute');
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const { errorHandler } = require('./controllers/errorController');
require("dotenv").config({ path: ".env" });

var app = express();
app.use(cors());

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use('/', indexRouter);
app.use(usersRouter);
app.use(reviewRouter);
app.use(expRouter);
app.use(fakerRouter);
app.use(tagRouter);
app.use(errorRouter);
app.use(errorHandler);

mongoose.connect(process.env.MONGGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("connected to database"))

module.exports = app;
