

var user = require('./user')

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
    new GoogleStrategy({
            clientID: '85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com',
            clientSecret: 'uxIocixkvihbjNzlnwBcAfWf',
            callbackURL: 'http://localhost:8000/auth/google/callback',
            scope: 'https://www.googleapis.com/auth/userinfo.email' 
        },
        function(accessToken, refreshToken, profile, done) {
            console.log('here', profile)
            return done(null, profile);
    })
)

exports.passport = passport


