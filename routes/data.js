
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
     return data('id').match(req.params.id + '_')
    }).run(app.con, function(err, cursor) {
        if(err) return callback(err)
        cursor.toArray(function(err, results){
            var families = {}
            var persons = {}
            callback(err, {families: families, persons: person})
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
        r.db(app.db_name).table(app.tbl_data).insert(list).run(app.con, callback)
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
    var individuals = data.individuals
    var families = data.families
    for(var key in families){
        if(families[key].id == undefined)
            families[key].id = key
        list.push(families[key])
    }
    for(var key in individuals){
        if(individuals[key].id == undefined)
            individuals[key].id = key
        list.push(individuals[key])
    }

    callback(null, list)
}

function listToData(list, callback){
    var individuals = {}
    var families = {}
    for(var i in list){
        if(list[i].id.split('_')[1].charAt(0) == "I" ) {
            individuals[list[i].id] = list[i]
        } else if(list[i].id.split('_')[1].charAt(0) == "F" ) {
            families[list[i].id] = list[i]
        } else {
            console.log('Invalid Id!', list[i].id)
            throw new Error(list[i].id + 'is not valid')
        }
    }
    callback(null, { individuals: individuals, families: families})
}

exports.dataUpsert = dataUpsert
exports.dataGet = dataGet
exports.dataDelete = dataDelete
exports.dataGetAll = dataGetAll
exports.dataAll = dataAll