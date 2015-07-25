var cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  openIdConnect = require('passport-openidconnect').Strategy;

var nconf = require('nconf');

nconf.argv()
  .env()
  .file({ file: './config.json' });

module.exports = function () {

  var authModule = {};

  authModule.init = function () {

    passport.use('openidconnect', new openIdConnect(
        {
          tokenURL: nconf.get('auth').openid.tokenuri,
          authorizationURL: nconf.get('auth').openid.authuri,
          clientID: 'whatsup',
          clientSecret: nconf.get('secret'),
          callbackURL: nconf.get('auth').openid.callbackuri,
          skipUserProfile: true
        },
        function (issuer, sub, done) {
          return done(null, new User(sub));
        })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });

    var User = function (sub) {
      this.id = sub;
    };

    return authModule;
  };

  authModule.flow = function (app) {
    app.use(cookieParser());

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/callback?', function (req, res, next) {
      passport.authenticate('openidconnect',
        function (err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.redirect('/login');
          }
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect('/');
          });
        })(req, res, next);
    });

    app.use(function (req, res, next) {
      if (!req.user) {
        passport.authenticate('openidconnect')(req, res, next);
      }
      else {
        next();
      }
    });
  };

  return authModule;
};