
var app = require('../app.js')
var r = require('rethinkdb')
var gedcom = require('../gedcom')

var NULL_RESPONSE = { 'results' : 'no data found' }

// data functions (add, get, update, delete)
function dataGet(req, res){
    r.db(app.db_name).table(app.tbl_data).get(req.params.id + "_" + req.params.data).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

// data functions (add, get, update, delete)
function dataGetAll(req, res){
    r.db(app.db_name).table(app.tbl_data).filter(function(data) {
     return data("id").match(req.params.id + "_")
    }).run( conn, function(err, result) {
        console.log(result);
        // res.send('200', result)
    })
}

function dataDelete(req, res){
    // var resultsList = []
    r.expr(req.body).forEach(function(id) {
        return r.db(app.db_name).table(app.tbl_data).get(id).delete().run(app.con, function(err, result) {
            if(err) throw err
            // resultsList.push(result);
        })
    })
    res.send('200', 'OK')
    // r.db(app.db_name).table(app.tbl_data).get(req.params.id).filter(function(data) {
    // }).run(app.con, function(err, result){
    //     if (err) throw err
    //     if(result == null) result = NULL_RESPONSE
    //     res.send('200', result)
    // })
}

function dataUpsert(req, res){
    r.db(app.db_name).table(app.tbl_data).insert(req.body).run(app.con, function(err, result){
        if (err) throw err
        if(result == null) result = NULL_RESPONSE
        res.send('200', result)
    })
}

function datasAll(req, res){
    r.db(app.db_name).table(app.tbl_data).run(app.con, function(err, cursor){
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

    var filepath = req.files.data_file[0].path

    if (typeof req.files !== 'object' || typeof req.files.data_file !== 'object')
    {
        res.send(400, JSON.stringify({ error: 'You must upload a file' }))
        removeFile(filepath)
        return
    }

    if (req.files.data_file.length !== 1)
    {
        res.send(400, JSON.stringify({ error: 'You can only upload one file (you tried uploading ' + req.files.data_file.length + ')' }))
        removeFile(filepath)
        return
    }

    var name = req.headers['x-file-name']
    if (name !== req.files.data_file[0].name)
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
        res.end(JSON.stringify(data))
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
        var parser = require('./gedcom-parse')
        var data = parser.parse(top)

        cb(false, data)
    })
}

exports.dataUpsert = dataUpsert
exports.dataGet = dataGet
exports.dataDelete = dataDelete
exports.dataGetAll = dataGetAll
exports.parse = parse