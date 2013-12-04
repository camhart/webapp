
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

    var filepath = req.files.user_file[0].path

    if (typeof req.files !== 'object' || typeof req.files.user_file !== 'object')
    {
        res.send(400, JSON.stringify({ error: 'You must upload a file' }))
        removeFile(filepath)
        return
    }

    if (req.files.user_file.length !== 1)
    {
        res.send(400, JSON.stringify({ error: 'You can only upload one file (you tried uploading ' + req.files.user_file.length + ')' }))
        removeFile(filepath)
        return
    }

    var name = req.headers['x-file-name']
    if (name !== req.files.user_file[0].name)
    {
        res.send(400, JSON.stringify({ error: 'Name in header does not match file name' }))
        removeFile(filepath)
        return
    }

    var extension = path.extname(name).toLowerCase()
    var size = parseInt(req.headers['content-length'], 10)

    if (extension !== '.ged' && extension !== '.gedcom')
    {
        res.send(406, JSON.stringify({ error: 'Invalid file extension (' + extension + '). Must be .ged or .gedcom' }))
        removeFile(filepath)
        return
    }

    processFile(filepath, function(err, data)
    {
        if (err)
        {
            console.log(err)
            throw err
        }

        console.log('parse success!')
        removeFile(filepath)
        res.end(JSON.stringify({ result: data }))
    })
}

function removeFile(filepath)
{
    var fs = require('fs')
    fs.unlink(filepath, function(err)
    {
        if (err)
            throw err

        console.log('successfully removed', filepath)
    })
}

function processFile(filepath, cb)
{
    gedcom.parse(filepath, function(top)
    {
        var people = processGCData(top.INDI)

        cb(false, JSON.stringify(people))
    })
}

function processGCData(data)
{
    var people = []

    for (var i in data)
    {
        var person = {}

        var pdata = data[i]

        var name = pdata.NAME
        if (name)
        {
            person.fullname = name.value
            if (typeof name.SURN === 'object')
                person.surname = name.SURN.value

            if (typeof name.GIVN === 'object')
                person.givenname = name.GIVN.value
        }

        var gender = pdata.SEX
        if (gender)
        {
            person.gender = gender.value
        }

        var birth = pdata.BIRT
        if (birth)
        {
            if (typeof birth.DATE === 'object')
                person.birthdate = birth.DATE.value

            if (typeof birth.PLAC === 'object')
                person.birthplace = birth.PLAC.value
        }

        var death = pdata.DEAT
        if (death)
        {
            if (typeof death.DATE === 'object')
                person.deathdate = death.DATE.value

            if (typeof death.PLAC === 'object')
                person.deathplace = death.PLAC.value
        }

        var burial = pdata.BURI
        if (burial)
        {
            if (typeof burial.DATE === 'object')
                person.burialdate = death.DATE.value

            if (typeof burial.PLAC === 'object')
                person.burialplace = death.PLAC.value
        }

        var afn = pdata.AFN
        if (afn)
        {
            person.afn = afn.value
        }

        var bapl = pdata.BAPL
        if (bapl)
        {
            if (typeof bapl.DATE === 'object')
                person.lds_baptism_date = bapl.DATE.value
            if (typeof bapl.TEMP === 'object')
                person.lds_baptism_temple = bapl.TEMP.value
        }

        for (var j in pdata)
        {
            console.log(j)
        }

        people.push(person)

        break
    }

    console.log(people)
    return people
}

exports.User = User
exports.userAdd = userAdd
exports.userGet = userGet
exports.userUpdate = userUpdate
exports.userDelete = userDelete
exports.usersAll = usersAll
exports.parse = parse
