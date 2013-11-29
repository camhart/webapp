
// global Settings
exports.server_port = 8000
exports.db_port = 28015
exports.db_host = 'localhost'
exports.db_name = 'vp'
exports.user_tbl = 'user'
exports.env = 'development'

// module dependencies.
var express = require('express')
var routes = require('./routes/routes')
var http = require('http')
var path = require('path')

// express
var app = express()

// all environments
app.set('port', process.env.PORT || this.server_port)
app.set('env', this.env)
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

// home
app.get('/', routes.home)
app.get('/contact', routes.contact)
app.post('/login', routes.login)
app.post('/logout', routes.logout)

// user
app.put(   '/user/:id', routes.userAdd)
app.get(   '/user/:id', routes.userGet)
app.post(  '/user/:id', routes.userUpdate)
app.delete('/user/:id', routes.userDelete)

// person
app.put(   '/person/:id', routes.personAdd)
app.get(   '/person/:id', routes.personGet)
app.post(  '/person/:id', routes.personUpdate)
app.delete('/person/:id', routes.personDelete)

// other
app.get('/overview', routes.assignments)
app.get('/protocol', routes.protocol)
app.get('/resetdb', routes.resetdb)




// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

