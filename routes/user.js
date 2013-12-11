
var app = require('../app.js')
var r = require('rethinkdb')


var NULL_RESPONSE = { 'results' : 'no user found' }

function User(firstname, lastname, gender, email){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
    this.root = "";
}

// user functions (add, get, update, delete)
function userGet(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).run(app.con, callback)
}

function userDelete(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).delete().run(app.con, callback)
}

function userUpsert(user, callback){
    r.db(app.db_name).table(app.tbl_user).insert(user, {upsert: true}).run(app.con, callback)
}

function usersAll(callback){
    r.db(app.db_name).table(app.tbl_user).run(app.con, function(err1, cursor){
        cursor.toArray(function(err2, result){
            callback([err1, err2], result)
        })
    })
}

exports.User = User
exports.userUpsert = userUpsert
exports.userGet = userGet
exports.userDelete = userDelete
exports.usersAll = usersAll