
// global Settings
var env = 'development'
var server_port = 8000
var db_port = 28015
var db_host = 'localhost'
var db_name = 'vp'
var tbl_user = 'user'
var tbl_data = 'data'
var con = null

var routes = require('./routes/routes')
var user = require('./routes/user')
var data = require('./routes/data')

// module dependencies.
var http = require('http')
var path = require('path')
var r = require('rethinkdb')
var express = require('express')
var gedcom = require('./gedcom')

var ged = require('./gedcom')

r.connect( {host: db_host, port: db_port, db: this.db_name}, function(err, connection) {
    if (err) {
        console.log(err)
        console.log('ERROR: Running Without Rethinkdb!')
        return
    }
    con = connection
    exports.con = con
})

// express
var app = express()

// all environments
app.set('port', process.env.PORT || server_port)
app.set('env', env)
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(express.bodyParser({ keepExtensions: false, uploadDir: "uploads" }))
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'test')))


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.home)
app.get('/contact', routes.contact)
app.get('/overview', routes.overview)
app.get('/protocol', routes.protocol)
app.get('/resetdb', routes.resetdb)

app.post('/login', routes.login)
app.post('/logout', routes.logout)

// user
app.get(   '/user/:id', user.userGet)
app.delete('/user/:id', user.userDelete)
app.post(  '/user/:id', user.userUpsert)

// data
app.get(   '/data/:id/:data', data.dataGet)
app.get(   '/data/:id', data.dataGetAll)
app.delete('/data/:id', data.dataDelete)
//?app.delete('/user/:id/:data', user.userDelete)
app.post(  '/data/:id/:data', data.dataUpsert)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

// gedcom parse
app.post('/parse', user.parse)

exports.db_name = db_name
exports.tbl_user = tbl_user
exports.tbl_data = tbl_data
// exports.con = con


