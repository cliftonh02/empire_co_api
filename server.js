// set up ======================================================================
// get all tools needed
var express        = require('express');
var app            = express();
var passport       = require('passport');

var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('cookie-session');
var methodOverride = require('method-override');

// config ==================================================
var port = process.env.PORT || 8080; // set our port

// connect to database
require('./db/connection');

// set up our express application
app.use(logger('dev')); // log
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // why true or false?
app.use(bodyParser.json());
app.use(methodOverride()); // simulate DELETE and PUT

// passport/passport-local
// https://github.com/saintedlama/passport-local-mongoose
var User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// https://github.com/expressjs/cookie-session#api
app.use(session({
  // https://devcenter.heroku.com/articles/heroku-local
  secret: process.env.SESSION_SECRECT || 'lazydog',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// routes
require('./routes/auth')(app, passport);
require('./routes/products')(app);
require('./routes/users')(app, passport);

// start app ===============================================
app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});
