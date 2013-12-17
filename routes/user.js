
var app = require('../app.js')
var r = require('rethinkdb')


var NULL_RESPONSE = { 'results' : 'no user found' }


function userGet(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).run(app.con, callback)
}

function userGetByEmail(email, callback){
    if(!email) return callback(null, [])
    userGetBySecondary(email, 'email', callback)
}

function userGetBySecondary(keys, index, callback){
    r.db(app.db_name).table(app.tbl_user).getAll(keys, { index: index}).run(app.con, function(err, cursor){
        if (err) return callback(err)
        cursor.toArray(callback)
    })
}

function userUpsert(user, callback){
    r.db(app.db_name).table(app.tbl_user).insert(user, {upsert: true}).run(app.con, callback)
}

function userDelete(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).delete().run(app.con, callback)
}

function userGetOrCreate(user, secondaryIndex, callback){
    
    function update(oldUser, newUser, callback){
        for (var attrname in newUser)
            oldUser[attrname] = newUser[attrname]; 
        userUpsert(oldUser, function(err, result){
            callback(err, oldUser)
        }) 
    }

    function updateSecondary(){
        userGetBySecondary(user[secondaryIndex], secondaryIndex, function(err, users){
            if(err) {
                callback(err)
            } else if(users.length != 0){
                update(users[0], user, callback)
            } else {
                userUpsert(user, function(err, result){
                    if(err) return callback(err)
                    console.log('created user: ', user)
                    user.id = result.generated_keys[0]
                    callback(null, user)
                })
            }
        })
    }

    userGetByEmail(user.email, function(err, users){
        if(err) {
            callback(err)
        } else if(users.length != 0){
            update(users[0], user, callback)
        } else {
            updateSecondary()
        }
    })
}

function usersAll(callback){
        r.db(app.db_name).table(app.tbl_user).run(app.con, function(err1, cursor){
            cursor.toArray(function(err2, result){
                callback([err1, err2], result)
            })
        })
    }


exports.userGet = userGet
exports.userGetByEmail = userGetByEmail
exports.userGetBySecondary = userGetBySecondary
exports.userGetOrCreate = userGetOrCreate
exports.userUpsert = userUpsert
exports.userDelete = userDelete
exports.usersAll = usersAll
