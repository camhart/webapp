
var app = require('../app.js')
var r = require('rethinkdb')


var NULL_RESPONSE = { 'results' : 'no user found' }


function userGetBySecondary(keys, index, callback){
    r.db(app.db_name).table(app.tbl_user).getAll(keys, { index: index}).run(app.con, function(err, cursor){
        if (err) return callback(err)
        cursor.toArray(callback)
    })
}

function userUpsert(user, callback){
    r.db(app.db_name).table(app.tbl_user).insert(user, {upsert: true}).run(app.con, callback)
}

module.exports = {

    // user functions (add, get, update, delete)
    userGet: function(id, callback){
        r.db(app.db_name).table(app.tbl_user).get(id).run(app.con, callback)
    },

    userUpsert: userUpsert, 

    userGetBySecondary: userGetBySecondary,

    userGetOrCreate: function(user, secondaryIndex, callback){
        userGetBySecondary(user[secondaryIndex], secondaryIndex, function(err, users){
            if(err) return callback(err)
            else if(users.length == 0){
                userUpsert(user, function(err, result){
                    if(err) return callback(err)
                    console.log('created user: ', result)
                    user.id = result.generated_keys[0]
                    return callback(null, user)
                })
            } else 
                return callback(null, users[0]);
        })
    },  


    userDelete: function(id, callback){
        r.db(app.db_name).table(app.tbl_user).get(id).delete().run(app.con, callback)
    },

    usersAll: function(callback){
        r.db(app.db_name).table(app.tbl_user).run(app.con, function(err1, cursor){
            cursor.toArray(function(err2, result){
                callback([err1, err2], result)
            })
        })
    }
}
