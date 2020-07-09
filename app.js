const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

dotenv.config();
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));


const SECONDS = 1000 * 3;

app.use(session({
  resave: false,
  saveUninitialized: true,
  store : new FileStore(),
  secret : process.env.SESSION_SECRET,
  cookie : {maxAge : SECONDS}
}));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


// 에러 처리
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
