
var user = require('./user')
var app = require('../app')


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
        // clientID: '85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com',
        // clientSecret: 'uxIocixkvihbjNzlnwBcAfWf',
        clientID: '85896237045-hk7el7flpp0qm3b55dn8edovpn1f76ab.apps.googleusercontent.com',
        clientSecret: '8kN8HgVyifkN9l9DZUrr_6Qz',
        callbackURL: 'http://' + app.domain + '/auth/google/callback',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 
        'https://www.googleapis.com/auth/userinfo.profile']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('google-here', profile._json)
        var googleUser = {
            email: profile._json.email,
            googleid: profile._json.id, 
            name: profile._json.name,
            picture: profile._json.picture,
            gender: profile._json.gender
        }
        
        user.userGetOrCreate(googleUser, 'googleid', done)
    })
)

passport.use(
    new GitHubStrategy({
        clientID: '84612e8c6f5b487eb5c3',
        clientSecret: '667c3dfb25fdd23d0429f373e37ab5451142c570',
        callbackURL: 'http://' + app.domain + '/auth/github/callback',
        scope: 'user:email'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('github-here', profile._json)
        var githubUser = {
            githubid: profile._json.id,
            email: profile._json.email,
            name: profile._json.name
        }
        user.userGetOrCreate(githubUser, 'githubid', done)
    })
)

passport.use(
    new FacebookStrategy({clientID: '472051912916435',
        clientSecret: '19c9230012764c821a5f2fddbdb2e7a0',
        callbackURL: 'http://' + app.domain + '/auth/facebook/callback',
        scope: ['email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('facebook-here', profile._json)
        var facebookUser = {
            facebookid: profile._json.id,
            gender: profile._json.gender,
            name: profile._json.name,
            email: profile._json.email
        }
        console.log(facebookUser)
        user.userGetOrCreate(facebookUser, 'facebookid', done)
    })
)

passport.use(
    new FamilySearchStrategy({
        devKey: 'NQ3Q-PBD8-LL9N-RCLZ-MZCZ-X7P8-7SMX-RD6N',
        callbackURL: 'http://' + app.domain + '/auth/login/return/',
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('familysearch-here', profile._json.users)
        var familysearchUser = {
            familysearchid: profile._json.users[0].id,
            email: profile._json.users[0].email,
            name: profile._json.users[0].displayName,
            gender: profile._json.users[0].gender.toLowerCase(),
        }
        user.userGetOrCreate(familysearchUser, 'familysearchid', done)
    })
)

passport.use(
    new TwitterStrategy({
        consumerKey: 'wmKLl2voXmjhSyz5qT9jbg',
        consumerSecret: 'jCpZHgJSk2lG15nXiqicRSbGaPqu7oYmsrveIROo',
        callbackURL: 'http://' + app.domain + '/auth/twitter/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('twitter-here', profile._json)
        var twitterUser = {
            twitterid: profile._json.id,
            name: profile._json.name,
            picture: profile._json.profile_image_url_https
        }
        user.userGetOrCreate(twitterUser, 'twitterid', done)
    })
)

exports.passport = passport
