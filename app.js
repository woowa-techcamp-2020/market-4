const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
// const signupRouter = require('./router/signup');
const loginRouter = require('./routes/login');

// DB 관련
const MEMORY_DB = ':memory:';
const LOCAL_DB = './local.db';
const {Db, MemberRepository} = require('./db');

const db = await new Db(MEMORY_DB);
const memberRepository = await new MemberRepository(Db);
await memberRepository.createTable();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/signup', signupRouter);
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
