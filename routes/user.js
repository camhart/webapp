
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

function table(req, res){
    // r.db(app.db_name).table(app.tbl_user).filter(function(user) {
    //     return user.hasFields("id");
    // }).run(app.con, function(err, result){
    //     if (err) throw err
    //     if(result == null) result = NULL_RESPONSE
    //     console.log(result)
    //     res.send('200', result)
    // })
    res.send('200', "not fully implemented");
}

function parse(req, res)
{
    console.log('Parsing GEDCOM file!')
    console.log(req)
    gedcom.parse('/Users/ryan/Documents/Family History/MaxEsplin1.ged', function(top)
    {
        var ret = JSON.stringify(top.INDI, function(index, value)
        {
            if (index === 'parent')
                return -1
            else
                return value
        })

        res.send('200', ret)
    })
}

exports.User = User
exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete
exports.parse = parse
exports.table = table
