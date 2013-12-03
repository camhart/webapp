
var app = require('../app.js')
var r = require('rethinkdb')

var NULL_RESPONSE = { 'results' : 'null' }

function Person(userid, afn, givenname, surname, gender){
    this.userid = userid
    this.afn = afn
    this.id = userid + "_" + afn
    this.givenname = givenname
    this.surname= surname
    this.gender = gender
}

// user functions (add, get, update, delete)
function personGet(req, res){
    // r.db(app.db_name).table(app.tbl_person).get(req.params.id).run(app.con, function(err, result){
    //     if (err) throw err 
    //     if(result == null) result = NULL_RESPONSE
    //     res.send('200', result)
    // })
    r.db(app.db_name).table(app.tbl_person).get(req.body).run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function personDelete(req, res){
    r.db(app.db_name).table(app.tbl_person).get(req.params.id).delete().run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function personAdd(req, res){
    r.db(app.db_name).table(app.tbl_person).insert(req.body).run(app.con, function(err, result){
        if (err) throw err
        res.send('200', result)
    }) 
}

function personUpdate(req, res){
    r.db(app.db_name).table(app.tbl_person).get(req.body.id).replace(req.body).run(app.con, function(err, result){
        if (err) throw err 
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function batchPersonAdd(req, res) {
    
}

function batchPersonUpdate(req, res) {

}

function batchPersonDelete(req, res) {

}

function batchPersonGet(req, res) {
    
}

exports.Person = Person
exports.personAdd = personAdd
exports.personGet = personGet
exports.personUpdate = personUpdate
exports.personDelete = personDelete
exports.batchPersonAdd = batchPersonAdd
exports.batchPersonUpdate = batchPersonUpdate
exports.batchPersonDelete = batchPersonDelete
exports.batchPersonGet = batchPersonGet
