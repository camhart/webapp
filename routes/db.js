


//  All the Database code should go in here for now. Keep all the 'rethink' stuff together

var r = require('rethinkdb')
var dummy = require('./dummydata.js')
var app = require('../app.js')

var db_host = app.db_host
var db_port = app.db_port
var db_name = app.db_name
var user_tbl = app.user_tbl

var con = null

r.connect( {host: db_host, port: db_port, db: db_name}, function(err, connection) {
    if (err) {
        console.log(err)
        console.log('Running Without Rethinkdb!')
        return
    }
    con = connection
})

function userAdd(user, callback){
    r.db(db_name).tableList().run(con, function(err, result){
        if(err) throw err

        function add(user, callback){
            r.db(db_name).table(user_tbl).insert(user).run(con, function(err, result){
                if (err) throw err
                if (result.errors != 0) console.log('ERROR: ', result.first_error)
                else
                    console.log('  ADDED: ', user.email)
                callback(result)
            }) 
        }

        if(result.indexOf(user_tbl) == -1)
            r.db(db_name).tableCreate(user_tbl, {'primaryKey': 'email'}).run(con, function(err, result){
                if(err) throw err
                console.log('CREATED: ', user_tbl)
                add(user, callback)
            })
        
        else{
            console.log(user)
            add(user, callback)
        }
    })
}

function userGet(email, callback){
    r.table(user_tbl).get(email).run(con, function(err, result){
        if (err) throw err
        if(result == null) result = { found : '0 users' }
        console.log('FOUND: ', result)
        callback(result)
    })
}

function userUpdate(email, callback){

}

function userDelete(email, callback){

}

function reset(callback){
    r.dbList().run(con, function(err, result){
        if(err) throw err

        function createDatabase(callback){
            r.dbList().run(con, function(err, result){
                if (err) throw err
                if(result.indexOf(user_tbl) == -1)
                    r.dbCreate(db_name).run(con, function(err, result){
                        if (err) throw err
                        console.log('CREATED: ', db_name)
                        callback()
                    })
            })
        }

        if(result.indexOf(db_name) != -1)
            r.dbDrop(db_name).run(con, function(err, result){
                console.log("DROPPED: ", db_name)
                if(err) throw err
                createDatabase(callback)
            })
        else
            createDatabase(callback)
    })
}

function populate(callback){
    user = dummy.getDummyUser(['0', '1', '2', '3'])
    userAdd(user, callback)
    // callback()
}

exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete

exports.reset = reset
exports.populate = populate