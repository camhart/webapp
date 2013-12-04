
var app = require('../app.js')
var r = require('rethinkdb')
var gedcom = require('../gedcom')

var NULL_RESPONSE = { 'results' : 'no user found' }

function User(firstname, lastname, gender, email){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
}

// user functions (add, get, update, delete)
function userGet(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.params.id).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function userDelete(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.params.id).delete().run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function userAdd(req, res){
    r.db(app.db_name).table(app.tbl_user).insert(req.body).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function userUpdate(req, res){
    r.db(app.db_name).table(app.tbl_user).get(req.body.id).replace(req.body).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function usersAll(req, res){
    r.db(app.db_name).table(app.tbl_user).run(app.con, function(err, cursor){
        if(err) throw err
        cursor.toArray(function(err, results){
            res.send('200', results);
        })
    })
}

function parse(req, res)
{
    console.log('Parsing GEDCOM file!')
    var path = require('path')

    var name = req.headers['x-file-name']
    if (!name)
    {
        res.send(406, JSON.stringify({error: "No name specified."}))
        return
    }

    var extension = path.extname(name).toLowerCase()
    if (extension !== '.ged' && extension !== '.gedcom')
    {
        res.send(406, JSON.stringify({error:'Invalid file extension. Must be .ged or .gedcom'}))
        return
    }

    var size = parseInt(req.headers['content-length'], 10);
    if (!size || size < 0)
    {
        res.send(411, JSON.stringify({error: "No size specified."}))
        return
    }

    console.log(name, extension, size)
    console.log(req.headers)

    res.send(JSON.stringify({success:true}))
}

exports.User = User
exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete
exports.usersAll = usersAll
exports.parse = parse
