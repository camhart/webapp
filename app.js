
// global Settings
var env = 'development'
var server_port = 8000
var db_port = 28015
var db_host = 'localhost'
var db_name = 'vp'
var tbl_user = 'user'
var tbl_data = 'data'
var con = null


// includes
var routes = require('./routes/routes')
var user = require('./routes/user')
var data = require('./routes/data')
var auth = require('./routes/auth')

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
    app.get('/resetdb', routes.resetdb)
    app.get('/protocol', routes.protocol)
    app.get('/user', user.usersAll)
    app.get('/data', data.dataAll)
}

app.get('/', routes.home)
app.get('/contact', routes.contact)
app.get('/overview', routes.overview)
app.post('/login', routes.login)
app.post('/logout', routes.logout)
app.post('/parse', user.parse)

// user
app.get(   '/user/:id', user.userGet)
app.delete('/user/:id', user.userDelete)
app.post(  '/user', user.userUpsert)

// data
app.get(   '/data/:id/:data', data.dataGet)     // get specific data
app.get(   '/data/:id', data.dataGetAll)        // get all data
app.delete('/data/:id', data.dataDelete)        // delete [] data
app.post(  '/data/:id', data.dataUpsert)       // upsert [] data

app.get('/authcallback', auth.googleAuth)
// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

// exports
exports.db_name = db_name
exports.tbl_user = tbl_user
exports.tbl_data = tbl_data


