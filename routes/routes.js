

var dummy = require('../test/dummydata')
var db = require('./db')

var HOMEPAGE = './public/vp.html'
var PROTOCOLPAGE = './test/protocol/protocol.html'
var ASSIGNMENTSPAGE = './public/overview.html'

// static pages
function home(req, res){
    console.log("Main Page!")
    res.sendfile(HOMEPAGE)
}

function contact(req, res){
    console.log("Contact Page!")
    res.sendfile(HOMEPAGE)
}

function assignments(req, res){
    console.log('Assignment Page!')
    res.sendfile(ASSIGNMENTSPAGE)
}

// login/logout requests
function login(req, res){
    console.log("Loggining In!")
    res.sendfile(HOMEPAGE)
}

function logout(req, res){
    console.log("Loggining Out!")
    res.sendfile(HOMEPAGE)
}

function protocol(req, res){
    res.sendfile(PROTOCOLPAGE)
}

function resetdb(req, res){
    db.reset(function(results){
        console.log(results)
        var header = "<h1>Database Reset!</h1>"
        var output = "<p>" + JSON.stringify(results) + "<p>"
        res.send('200', header + output)
    })
}

function populatedb(req, res){
    db.populate(function(results){
        console.log(results)
        var header = "<h1>Database Populated!</h1>"
        var output = "<p>" + JSON.stringify(results) + "<p>"
        console.log(output)
        res.send('200', header + output)
    })
}

exports.home = home
exports.contact = contact
exports.assignments = assignments
exports.login = login
exports.logout = logout
exports.protocol = protocol
exports.resetdb = resetdb
exports.populatedb = populatedb