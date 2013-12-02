
// global Settings
var env = 'development'
var server_port = 8000
var db_port = 28015
var db_host = 'localhost'
var db_name = 'vp'
var tbl_user = 'user'
var tbl_person = 'person'
var con = null

var routes = require('./routes/routes')
var user = require('./routes/user')
var person = require('./routes/person')

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
app.use(express.bodyParser())
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
app.get('/populate', routes.populatedb)

app.post('/login', routes.login)
app.post('/logout', routes.logout)

// user
app.get(   '/user/:id', user.userGet)
app.delete('/user/:id', user.userDelete)
app.put(   '/user', user.userAdd)
app.post(  '/user', user.userUpdate)

// person
app.get(   '/person/:id', person.personGet)
app.delete('/person/:id', person.personDelete)
app.put(   '/person', person.personAdd)
app.post(  '/person', person.personUpdate)

//batch person
app.get('/persons/:id', person.batchPersonGet)
app.put('/persons/:id', person.batchPersonAdd)
app.delete('/persons/:id', person.batchPersonDelete)
app.post('/persons/:id', person.batchPersonUpdate)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

exports.db_name = db_name
exports.tbl_user = tbl_user
exports.tbl_person = tbl_person
// exports.con = con


