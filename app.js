
// module dependencies.
var express = require('express')
var routes = require('./routes/routes')
var http = require('http')
var path = require('path')
var r = require('rethinkdb')

// global Settings
var server_port = 8000
var db_port = 28015
var db_host = 'localhost'
var db_name = 'vp'
var env = 'development'
var connection = null

// connect to database
r.connect( {host: db_host, port: db_port, db: db_name}, function(err, _conn) {
    if (err) throw err
    connection = _conn
})

var app = express()

// all environments
app.set('port', process.env.PORT || server_port)
app.set('env', env)
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

// get/post request
app.get('/', routes.home)
app.get('/login', routes.login)
app.get('/logout', routes.logout)
app.get('/contact', routes.contact)
app.get('/overview', routes.assignments)

app.get('/adduser', function(req, res){
    routes.adduser(req, res, connection)
})

app.get('/getuser', function(req, res){
    routes.getuser(req, res, connection)
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})
