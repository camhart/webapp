


//  All the Database code should go in here for now. Keep all the 'rethink' stuff together

var r = require('rethinkdb')

var user_tbl = 'user'

exports.addUserToDB = function(connection, user, callback){
    r.tableList().run(connection, function(err, result){
        if (err) throw err
        if(result.indexOf(user_tbl) == -1){
            r.tableCreate(user_tbl, {'primaryKey': 'email'}).run(connection, function(err, result){
                if (err) throw err
                console.log('Created Table: ', result)
            })
        }
        r.table(user_tbl).insert(user).run(connection, function(err, result){
            if (err) throw err
            if (result.errors != 0)
                console.log('ERROR: ', result.first_error)
            else
                console.log('ADDED: ', user)
            callback(result)
        })  
    })
}

exports.getUserFromDB = function(connection, email, callback){
    r.table(user_tbl).get(email).run(connection, function(err, result){
        if (err) throw err
        console.log('FOUND: ', result)
        callback(result)
    })
}