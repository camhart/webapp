
var app = require('../app.js')
var r = require('rethinkdb')

var NULL_RESPONSE = { 'results' : 'no data found' }

// data functions (add, get, update, delete)
function dataGet(id, callback){
    r.db(app.db_name).table(app.tbl_data).get(id).run(app.con, callback)
}

// data functions (add, get, update, delete)
function dataGetAll(userid, callback){
    r.db(app.db_name).table(app.tbl_data).filter(function(data) {
     return data('id').match(userid + '_')
    }).run(app.con, function(err, cursor) {
        if(err) return callback(err)
        cursor.toArray(function(err, results){
            listToData(results, function(people, families)
            {
                r.db(app.db_name).table(app.tbl_user).get(userid).run(app.con, function(err, user)
                {
                    if (err) return callback(err)
                    if (user)
                        callback(null, {people:people, families:families, root:user.root})
                    else
                        callback(null, {people:people, families:families})
                })
            })
        })
    })
}

function dataDelete(ids, callback){
    var resultsList = []
    r.expr(ids).forEach(function(id) {
        return r.db(app.db_name).table(app.tbl_data).get(id).delete()
    }).run(app.con, callback)
}

function dataUpsert(data, callback){
    dataToList(data, function(err, list){
        console.log(data)
        console.log(list)
        r.db(app.db_name).table(app.tbl_data).insert(list).run(app.con, function(err, result)
        {
            r.db(app.db_name).table(app.tbl_data).update(list).run(app.con, callback)
        })
    })
}

function dataAll(callback){
    r.db(app.db_name).table(app.tbl_data).run(app.con, function(err, cursor){
        if(err) return callback(err)
        cursor.toArray(function(err, results){
            listToData(results, callback)
        })
    })
}

function dataToList(data, callback){
    var list = []
    var people = data.people
    var families = data.families
    for(var key in families){
        if(families[key].id == undefined)
            families[key].id = key
        list.push(families[key])
    }
    for(var key in people){
        if(people[key].id == undefined)
            people[key].id = key
        list.push(people[key])
    }

    callback(null, list)
}

function listToData(list, callback){
    var people = {}
    var families = {}
    for(var i in list){
        if(list[i].id.split('_')[1].charAt(0) == "I" ) {
            people[list[i].id] = list[i]
        } else if(list[i].id.split('_')[1].charAt(0) == "F" ) {
            families[list[i].id] = list[i]
        } else {
            console.log('Invalid Id!', list[i].id)
            throw new Error(list[i].id + 'is not valid')
        }
    }
    callback(people, families)
}

exports.dataUpsert = dataUpsert
exports.dataGet = dataGet
exports.dataDelete = dataDelete
exports.dataGetAll = dataGetAll
exports.dataAll = dataAll