var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var usersRouter = require('./routes/users');
//app.use('/users', usersRouter);

/* oldversion && codeStyle */
//var v1Router = require('./routes/challengeV1');
var v2Router = require('./routes/challengeV2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', v1Router);

/* ------------------------------------------------------------------------- */

/* init Input/Output format check & set*/
app.use(v2Router.formatCheck);

/* mission:10 */
app.use(v2Router.checkDomain);

/* mission:9 */
app.use(v2Router.addTimestampForAll);

/* mission:3 */
app.get('/*', v2Router.refererUrlCheck);

/* mission:1 */
app.get('/shopback/resource', v2Router.reDir);
app.get('/shopback/static/assets', v2Router.realDir);

/* mission:2 & improve */
app.get('/shopback/me', v2Router.sbcookieExist, v2Router.sbcookieValueCheck, v2Router.shopbackMeMainMethod);

/* mission:4 */
app.get('/shopback/api/*', v2Router.addHeaderFrom);

/* mission:5.6.7 */
app.post('/*', v2Router.removeQuery, v2Router.checkAgent, v2Router.checkApplicationJson, v2Router.postAndPutMain);
app.put('/*', v2Router.removeQuery, v2Router.checkAgent, v2Router.checkApplicationJson, v2Router.postAndPutMain);

/* mission:8 & Rule is customizable */
app.delete('/*', v2Router.customizedAgentChk);

/* ------------------------------------------------------------------------- */

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
