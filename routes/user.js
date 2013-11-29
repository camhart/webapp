
var app = require('../app.js')
var r = require('rethinkdb')

var NULL_RESPONSE = { 'results' : 'null' }

function User(firstname, lastname, gender, email){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
}

// user functions (add, get, update, delete)
function userGet(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.params.id).run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function userDelete(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.params.id).delete().run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function userAdd(req, res){
    r.db(app.db_name).table(app.tbl_user).insert(req.body).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    }) 
}

function userUpdate(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.body.id).replace(req.body).run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

exports.User = User
exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete