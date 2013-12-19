
// global Settings
var env = 'development'
var db_port = 28015
var db_host = 'localhost'
var db_name = 'vp'
var tbl_user = 'user'
var tbl_data = 'data'

var server_host = 'localhost'
var server_port = 8000
var domain = server_host + ':' + server_port

var amazon_server = true

if(amazon_server){
    domain = 'virtualpedigree.no-ip.org'
    server_port = 80
}

exports.domain = domain

// includes
var routes = require('./routes/routes')
var data = require('./routes/data')
var api = require('./routes/api')
var passport = require('./routes/oauth').passport

// module dependencies.
var http = require('http')
var path = require('path')
var r = require('rethinkdb')
var express = require('express')

r.connect( {host: db_host, port: db_port, db: this.db_name}, function(err, connection) {
    if (err) {
        console.log(err)
        console.log('ERROR: Running Without Rethinkdb!')
        return
    }
    exports.con = connection
})

// express
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || server_port)
    app.set('env', env)
    app.use(express.favicon())
    app.use(express.logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded())

    app.use(express.cookieParser())
    app.use(express.bodyParser({ keepExtensions: false, uploadDir: "uploads" }))
    app.use(express.session({
        secret: 'some string used for calculating hash', 
        cookie: { maxAge : (3600000 * 16) } // 16 hours
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(app.router)

    app.use(express.methodOverride())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static(path.join(__dirname, 'test')))
})
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler())
    app.get('/resetdb', routes.resetdb)
    app.get('/protocol', routes.protocol)
    app.get('/api/user', api.usersAll)
    app.get('/api/data', api.dataAll)
}

app.get('/', routes.home)
app.get('/contact', routes.contact)
app.get('/overview', routes.overview)
app.get('/logout', routes.logout)

//api
app.all('/api/*', api.isAuthorized)
app.get('/api/user/:id', api.userGet)
app.delete('/api/user/:id', api.userDelete)
app.post('/api/user', api.userUpsert)
app.post('/api/user/:id/parse', api.userParse)
app.get('/api/data/:id', api.dataGet)
app.get('/api/user/:id/data', api.dataGetAll)
app.delete('/api/data', api.dataDelete)
app.post('/api/data/:id', api.dataUpsert)

//auth
var REDIRECT_OPTIONS = { successRedirect: '/', failureRedirect: '/overview' }
app.get('/auth/google', passport.authenticate('google'))
app.get('/auth/google/callback', passport.authenticate('google', REDIRECT_OPTIONS))
app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', REDIRECT_OPTIONS))
app.get('/auth/github', passport.authenticate('github'))
app.get('/auth/github/callback', passport.authenticate('github', REDIRECT_OPTIONS))
app.get('/auth/familysearch', passport.authenticate('familysearch'))
app.get('/auth/login/return', passport.authenticate('familysearch', REDIRECT_OPTIONS))
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback', passport.authenticate('twitter', REDIRECT_OPTIONS))

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

// exports
exports.db_name = db_name
exports.tbl_user = tbl_user
exports.tbl_data = tbl_data
