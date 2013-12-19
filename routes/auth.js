var https = require("https");
var user = require('./user');
var app = require('../app.js')
var r = require('rethinkdb')

//don't change this redirectURL no matter what, even if on webserver it should stay the same
var redirectUrl = "http://localhost:8000/auth/google"
var googleSecret = "uxIocixkvihbjNzlnwBcAfWf"
var googleClientId = "85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com"

var GOOGLE_BASE_URL = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='

function googleAuth(query, callback) {
    if(query.error) {
    	return callback(query.error, "You must grant permission to use app.")
    } else if(query.state == "getCode"){
	    var tokenUrl = "" ; //https://www.accounts.google.com/o/oauth2/token"
	    tokenUrl += "code=" + query.code;
	    tokenUrl += "&client_id=" + googleClientId;
	    tokenUrl += "&client_secret=" + googleSecret + "";
	    tokenUrl += "&redirect_uri=" + redirectUrl;
	    tokenUrl += "&grant_type=authorization_code";

		var post_options = {
			method: 'POST',
			host: 'accounts.google.com',
			path: '/o/oauth2/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': tokenUrl.length
			}
		};

		var data = tokenUrl;

		var post_req = https.request(post_options, function(res) {
			var body = '';
			res.on('data', function(chunk) {
				body += chunk;
			})	
			res.on('end', function() {
				getGoogleUserInfo(JSON.parse(body).access_token, callback)
			})
		})

		post_req.write(data);
		post_req.end()

		console.log(post_req.data)
		console.log(post_req.body)
	} else {
		return callback(query.state, null);
	}
}

function getGoogleUserInfo(acToken, callback) {

	https.get(GOOGLE_BASE_URL + acToken, function(res) {
		var chunks = "";
		res.on('data', function(chunk) {
			chunks += chunk;
		})
		res.on('end', function() {
			return callback(null, JSON.parse(chunks))
		})
        res.on('error', function(err){
            return callback(err)
        })
	})
}

exports.googleAuth = googleAuth