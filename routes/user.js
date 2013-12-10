
var app = require('../app.js')
var r = require('rethinkdb')
var gedcom = require('../gedcom')

var NULL_RESPONSE = { 'results' : 'no user found' }

function User(firstname, lastname, gender, email){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
    this.root = "";
}

// user functions (add, get, update, delete)
function userGet(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).run(app.con, callback)
}

function userDelete(id, callback){
    r.db(app.db_name).table(app.tbl_user).get(id).delete().run(app.con, callback)
}

function userUpsert(user, callback){
    r.db(app.db_name).table(app.tbl_user).insert(user, {upsert: true}).run(app.con, callback)
}

function usersAll(callback){
    r.db(app.db_name).table(app.tbl_user).run(app.con, function(err1, cursor){
        cursor.toArray(function(err2, result){
            callback([err1, err2], result)
        })
    })
}

function parse(req, res){
    console.log('Parsing GEDCOM file!')
    var path = require('path')

    var filepath = req.files.user_file[0].path

    if (typeof req.files !== 'object' || typeof req.files.user_file !== 'object'){
        res.send(400, JSON.stringify({ error: 'You must upload a file' }))
        removeFile(filepath)
        return
    }

    if (req.files.user_file.length !== 1){
        res.send(400, JSON.stringify({ error: 'You can only upload one file (you tried uploading ' + req.files.user_file.length + ')' }))
        removeFile(filepath)
        return
    }

    var name = req.headers['x-file-name']
    if (name !== req.files.user_file[0].name){
        res.send(400, JSON.stringify({ error: 'Name in header does not match file name' }))
        removeFile(filepath)
        return
    }

    var extension = path.extname(name).toLowerCase()
    var size = parseInt(req.headers['content-length'], 10)

    if (extension !== '.ged' && extension !== '.gedcom'){
        res.send(406, JSON.stringify({ error: 'Invalid file extension (' + extension + '). Must be .ged or .gedcom' }))
        removeFile(filepath)
        return
    }

    processFile(filepath, function(err, data){
        if (err){
            console.log(err)
            throw err
        }

        console.log('parse success!')
        removeFile(filepath)

        for(key in data.families)
            console.log(key, data.families[key])
        res.end(JSON.stringify(data))
    })
}

function removeFile(filepath){
    var fs = require('fs')
    fs.unlink(filepath, function(err){
        if (err)
            throw err

        console.log('successfully removed', filepath)
    })
}

function processFile(filepath, cb){
    gedcom.parse(filepath, function(top){
        var parser = require('./gedcom-parse')
        var data = parser.parse(top)
        console.log(JSON.stringify(data, undefined, 2))
        cb(false, data)
    })
}

exports.User = User
exports.userUpsert = userUpsert
exports.userGet = userGet
exports.userDelete = userDelete
exports.usersAll = usersAll
exports.parse = parse