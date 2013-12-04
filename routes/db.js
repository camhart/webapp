
var r = require('rethinkdb')
var app = require('../app')
var dummy = require('../test/dummydata')
var users = require('./user')

function reset(callback){
    dropDatabase(function(result1){
        createDatabase(function(result2){
            createUserTable(function(result3){
                createPersonTable(function(result4){
                    callback([result1, result2, result3, result4])
                })
            })
        })
    })
}

function dropDatabase(callback){
    r.dbDrop(app.db_name).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

function createDatabase(callback){
    r.dbCreate(app.db_name).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

function createUserTable(callback){
    r.db(app.db_name).tableCreate(app.tbl_user).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

function createPersonTable(callback){
    r.db(app.db_name).tableCreate(app.tbl_person).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

function populate(callback){
    user = dummy.getDummyUser([0, 1, 2, 3])
    cosole.log(user)
    users.userAdd(user, function(result){
        callback(result)
    })
}
exports.reset = reset
exports.populate = populate