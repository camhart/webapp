

var dummy = require('../test/dummydata')
var db = require('./db')
var homepage = './public/vp.html'
var protocolpage = './test/protocol.html'
var assignmentpage = './public/overview.html'

// static pages
function home(req, res){
    console.log("Main Page!")
    res.sendfile(homepage)
}

function contact(req, res){
    console.log("Contact Page!")
    res.sendfile(homepage)
}

function assignments(req, res){
    console.log('Assignment Page!')
    res.sendfile(assignmentpage)
}

// login/logout requests
function login(req, res){
    console.log("Loggining In!")
    res.sendfile(homepage)
}

function logout(req, res){
    console.log("Loggining Out!")
    res.sendfile(homepage)
}

function protocol(req, res){
    res.sendfile(protocolpage)
}

function resetdb(req, res){
    db.reset(function(){
        db.populate(function(){
            res.send('200', "<h1>Database Reset and Populated!</h1>")
        })
    })
}

// user functions (add, get, update, delete)
function userAdd(req, res){
    user = dummy.getDummyUser(['.', '.0', '.01', '.10', '.11', '111', '.00'])
    db.userAdd(user, function(result){
        res.send('200', result)
    })
}

function userGet(req, res){
    var email = req.params.id
    db.userGet(email, function(user){
        res.send('200', user)
    })
}

function userUpdate(req, res){
    console.log(req.body)
    console.log(req.params.id)
    res.send('200', 'Update User')
}

function userDelete(req, res){
    res.send('200', 'Delete User')
}

// person functions (add, get, update, delete)
function personAdd(req, res){
    res.send('200', 'Add Person')
}

function personGet(req, res){
    res.send('200', 'Get Person')
}

function personUpdate(req, res){
    res.send('200', 'Update Person')
}

function personDelete(req, res){
    res.send('200', 'Delete Person')
}


exports.home = home
exports.logout = logout
exports.login = login
exports.contact = contact

exports.assignments = assignments
exports.protocol = protocol
exports.resetdb = resetdb

exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete

exports.personAdd = personAdd
exports.personGet = personGet
exports.personUpdate = personUpdate
exports.personDelete = personDelete