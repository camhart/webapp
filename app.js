
// Module dependencies.
var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/user');
var http = require('http');
var path = require('path');
var r = require('rethinkdb');


// Global Settings
var server_port = 8000;
var db_port = 28015;
var db_host = 'localhost';
var connection = null;

r.connect( {host: db_host, port: db_port}, function(err, _conn) {
    if (err) throw err;
    connection = _conn;
});

var app = express();

// all environments
app.set('port', process.env.PORT || server_port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/adduser', function(req, res){
    users.adduser(req, res, connection);
});

app.get('/getusers', function(req, res){
    users.getusers(req, res, connection);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
