

var db = require('./db')
var dummy = require('./dummydata')
var homepage = './public/vp.html'
var assignmentpage = './public/overview.html'

exports.home = function(req, res){
    console.log("Main Page!")
    res.sendfile(homepage)
}

exports.login = function(req, res){
    console.log("Loggining In!")
    res.sendfile(homepage)
}

exports.logout = function(req, res){
    console.log("Loggining Out!")
    res.sendfile(homepage)
}

exports.contact = function(req, res){
    console.log("Contact Page!")
    res.sendfile(homepage)
}

exports.assignments = function(req, res)
{
    console.log('Overview Page!')
    res.sendfile(assignmentpage)
}

exports.adduser = function(req, res, connection){
    user = dummy.getDummyUser(['.', '.0', '.01', '.10', '.11', '111', '.00'])
    db.addUserToDB(connection, user, function(result){
        res.send('200', result)
    })
}

exports.getuser = function(req, res, connection){
    var email = 'email1'
    db.getUserFromDB(connection, email, function(user){
        res.send('200', user)
    })
}