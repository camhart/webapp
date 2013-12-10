
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
app.use(express.cookieParser())
app.use(express.session({secret: 'some string used for calculating hash'}))
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'test')))

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler())
    app.get('/resetdb', routes.resetdb)
    app.get('/protocol', routes.protocol)

    app.get('/user', function(req, res){
        user.usersAll(function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    })
    app.get('/data', function(req, res){
        data.dataAll(function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    })
}

app.all('/api/*', function(req, res, next){
    console.log('session', req.session)
    if(req.session && req.session.authorized){
        next()
    } else {
        res.send(401, 'Unauthorized')
    }
})

app.get('/', routes.home)
app.get('/contact', routes.contact)
app.get('/overview', routes.overview)

app.get('/login', function(req, res){
    req.session.authorized = true
    res.redirect('/')
})
app.post('/logout', function(req, res){
    req.sessino.authorized = false
    res.redirect('/')
})
app.post('/parse', user.parse)

app.get('/api/user/:id', function(req, res){
    user.userGet(req.params.id, function(err, result){
        if(err) console.log(err)
        res.send([err, result])
    })
})

app.delete('/api/user/:id', function(req, res){
    user.userDelete(req.body, function(err, result){
        if(err) console.log(err)        
        res.send(result)
    })
})

app.post('/api/user', function(req, res){
    user.userUpsert(req.body, function(err, result){
        if(err) console.log(err)
        res.send(result)
    })
})

app.get('/api/data/:id/:data', function(req, res){
    data.dataGet(req.params.id + '_' + req.params.data, function(err, result){
        if(err) console.log(err)
        res.send(result)
    })
})

app.get('/api/data/:id', function(req, res){
    data.dataGetAll(function(err, result){
        if(err) console.log(err)
        res.send(result)
    })
})

app.delete('/api/data/:id', function(req, res){
    data.dataDelete(req.params.id, function(err, result){
        if(err) console.log(err)
        res.send(result)
    })
})

app.post('/api/data/:id', function(req, res){
    data.dataUpsert(req.body, function(err, result){
        if(err) console.log(err)
        res.send(result)
    })
}) 

app.get('/auth/:type', function(req, res){
    if(req.params.type == 'google'){
        auth.googleAuth(req.query, function(err, result){
            if(err) console.log(err)
            else req.session.authorized = true
            console.log(result) // here is email address and stuff
            // res.send('<pre>' + JSON.stringify(result, undefined, 2) + '</pre>')
            res.redirect('/')
        })
    } else if(req.params.type == 'facebook'){
        auth.facebookAuth(req.body, function(err, result){
            if(err) console.log(err)
            console.log(result)
        })
    } else {
        res.send(501, 'Login Not Implemented')
    }
})

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('(' + app.get('env') + ') Express Server listening on port ', app.get('port'))
})

// exports
exports.db_name = db_name
exports.tbl_user = tbl_user
exports.tbl_data = tbl_data


