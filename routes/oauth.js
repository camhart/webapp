

var user = require('./user')

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var GitHubStrategy = require('passport-github').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var FamilySearchStrategy = require('passport-familysearch').Strategy
var TwitterStrategy = require('passport-twitter').Strategy


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    user.userGet(obj, done)
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
        var googleUser = {
            email: profile._json.email,
            googleid: profile._json.id
        }
        
        user.userGetOrCreate(googleUser, 'googleid', done)
    })
)

passport.use(
    new GitHubStrategy({
        clientID: '84612e8c6f5b487eb5c',
        clientSecret: '667c3dfb25fdd23d0429f373e37ab5451142c570',
        callbackURL: 'http://localhost:8000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('github-here', profile)
        // TODO
        // user.userGetOrCreate(githubUser, 'githubid', done)
        return done(null, profile);
    })
)

passport.use(
    new FacebookStrategy({clientID: '472051912916435',
        clientSecret: '19c9230012764c821a5f2fddbdb2e7a0',
        callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('facebook-here', profile)
        var facebookUser = {
            facebookid: profile._json.id,
            gender: profile._json.gender,
            name: profile._json.name
        }
        console.log(facebookUser)
        user.userGetOrCreate(facebookUser, 'facebookid', done)
    })
)

passport.use(
    new FamilySearchStrategy({
        devKey: 'NQ3Q-PBD8-LL9N-RCLZ-MZCZ-X7P8-7SMX-RD6N',
        callbackURL: "http://localhost:8000/auth/login/return/",
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('familysearch-here', profile)

        // TODO
        // user.userGetOrCreate(googleUser, 'googleid', done)
        return done(null, profile);
    })
)

passport.use(
    new TwitterStrategy({
        consumerKey: 'wmKLl2voXmjhSyz5qT9jbg',
        consumerSecret: 'jCpZHgJSk2lG15nXiqicRSbGaPqu7oYmsrveIROo',
        callbackURL: 'http://localhost:8000/auth/twitter/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('twitter-here', profile)
        return done(null, profile);
    })
)



exports.passport = passport
