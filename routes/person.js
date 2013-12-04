
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
    console.log(req.params.data)
    console.log(req.params.body)
    console.log(req.data)
    console.log(req.body)
    r.expr(req.body).eqJoin(function(doc) { return doc; }, r.db('vp').table("person")).run(app.con, function(err, result) {
        console.log(JSON.stringify(result));
        res.send('200', JSON.stringify(result));        
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

function table(req, res){
    // r.db(app.db_name).table(app.tbl_user).filter(function(person) {
    //     return person.hasFields("id");
    // }).run(app.con, function(err, result){
    //     if (err) throw err
    //     if(result == null) result = NULL_RESPONSE
    //     res.send('200', result)
    // })
    res.send('200', "not fully implemented");
}

exports.Person = Person
exports.personAdd = personAdd
exports.personGet = personGet
exports.personUpdate = personUpdate
exports.personDelete = personDelete
exports.table = table
