
var r = require('rethinkdb')
var app = require('../app')

var SECONDARY_INDEXES = ['googleid', 'facebookid', 'twitterid', 'familysearchid', 'githubid']


function reset(callback){
    dropDatabase(function(result1){
        createDatabase(function(result2){
            createUserTable(function(result3){
                createPersonTable(function(result4){
                    createSecondaryIndexes(function(result5){
                        callback([result1, result2, result3, result4, result5])
                    })
                })
            })
        })
    })
}

function dropDatabase(callback){
    var exsists = r.db('vp').info()
    if(exsists) {
        r.dbDrop(app.db_name).run(app.con, function(err, result){
            callback(result)
        })
    } else {
        callback({ skipped: 1})
    }
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
    r.db(app.db_name).tableCreate(app.tbl_data).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

function createSecondaryIndexes(callback){
    r.expr(SECONDARY_INDEXES).forEach(function(index){
        return r.db(app.db_name).table(app.tbl_user).indexCreate(index)
    }).run(app.con, function(err, result){
        if (err) throw err
        callback(result)
    })
}

exports.reset = reset