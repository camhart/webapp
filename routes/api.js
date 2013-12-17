
var user = require('./user')
var app = require('../app')
var util = require('./gedcom-parse')
var data = require('./data')

module.exports = {

    isAuthorized : function(req, res, next){
        if (req.user && req.user.id){
            console.log('Authorized API request')
            next()
        } else {
            res.send(401, 'Unauthorized')
        }
    },

    usersAll : function(req, res){
        user.usersAll(function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    userGet : function(req, res){
        user.userGet(req.params.id, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    userDelete : function(req, res){
        user.userDelete(req.body, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    userUpsert : function(req, res){
        user.userUpsert(req.body, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    userParse: function(req, res){
        util.parse(req.files, req.headers, req.params.id, function(err, result){
            if(err) {
                console.log(err)
                res.send(err.code, err.message)
            } else {
                console.log(JSON.stringify(result, undefined, 2))
                data.dataUpsert(result, function(err, result){
                    console.log('added data for user:' + req.params.id)
                })
                res.send('200', result)
            }
        })
    },

    dataAll : function(req, res){
        data.dataAll(function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    dataGet : function(req, res){
        data.dataGet(req.params.id, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    dataDelete : function(req, res){
        data.dataDelete(req.body, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    dataUpsert : function(req, res){
        data.dataUpsert(req.body, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    },

    dataGetAll : function(req, res){
        data.dataGetAll(req.params.id, function(err, result){
            if(err) console.log(err)
            res.send(result)
        })
    }

}
