const mongoose = require('mongoose');
mongoose.connection.on('connected', () =>
  console.log(`Mongoose connected to mongodb://localhost/test10`)
);
mongoose.connection.on('disconnected', () =>
  console.log('Mongoose disconnected.')
);
mongoose.connect('mongodb://localhost/test10');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');





//programs events users login
//2 affiliation and 1 events
//retreives the class
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var affiliationsRouter = require('./routes/affiliations');
var eventsRouter = require('./routes/events');
var authAffiliationRouter = require('./routes/authAffiliations');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//it uses it here
//order matters, must be written before the passport because of authentication
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/affiliations', affiliationsRouter);
app.use('/login', loginRouter);

//authentication
const passport = require('./passport');
app.use(passport.initialize());
app.use(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failWithError: true
  })
);

//after passport because it needs authentication
app.use('/events', eventsRouter);
app.use('/affiliations', authAffiliationRouter);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (req.originalUrl.startsWith('/')) {
    res.json({ msg: err.message });
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
  }
});

async function shutdown(signal, callback) {
  console.log(`${signal} received.`);
  await mongoose.disconnect();
  if (typeof callback === 'function') callback();
  else process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.once('SIGUSR2', signal => {
  shutdown(signal, () => process.kill(process.pid, 'SIGUSR2'));
});

module.exports = app;
