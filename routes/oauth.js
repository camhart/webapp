

var user = require('./user')

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var GitHubStrategy = require('passport-github').Strategy
var FacebookStrategy = require('passport-facebook').Strategy

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
        console.log('google-here', profile)
        return done(null, profile);
    })
)

passport.use(
    new GitHubStrategy({
        clientID: '84612e8c6f5b487eb5c',
        clientSecret: '667c3dfb25fdd23d0429f373e37ab5451142c570',
        callbackURL: 'http://localhost:8000/auth/github/callback',
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('github-here', profile)
        return done(null, profile);
    })
)

passport.use(
    new FacebookStrategy({
        clientID: '472051912916435',
        clientSecret: '19c9230012764c821a5f2fddbdb2e7a0',
        callbackURL: "http://localhost:8000/auth/facebook/callback",
        scope: 'user:email'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('facebook-here', profile)
        return done(null, profile);
    })
)

exports.passport = passport

// https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgithub%2Fcallback&client_id=84612e8c6f5b487eb5c&type=web_server


