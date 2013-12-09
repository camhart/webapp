var https = require("https");
var http = require("http");
var user = require('./user');
//var http = require("http");
var app = require('../app.js')
var r = require('rethinkdb')

//don't change this redirectURL no matter what, even if on webserver it should stay the same
var redirectUrl = "http://localhost:8000/authcallback"//"http%3A%2F%2Flocalhost%3A8001%2Fauthcallback";
var googleSecret = "uxIocixkvihbjNzlnwBcAfWf"
var googleClientId = "85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com"

function googleAuth(req, res) {
    if(req.query.error) {
    	res.send('200', "You must grant permission to use app.")
    } else if(req.query.state == "getCode"){
  
	    var tokenUrl = "code=" + req.query.code;
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

		var post_req = https.request(post_options, function(res2) {
			//console.log(err)
			//console.log(res2.body)
			var body = '';
			res2.on('data', function(chunk) {
				body += chunk;
				console.log("response: " + chunk)
			})	
			res2.on('end', function() {
				//console.log('end!' + JSON.stringify(res2))
				// console.log('data:=' + body["access_token"])
				// console.log('data:=' + body["\"access_token\""])
				var jsonBody = JSON.parse(body)
				console.log('data:=' + jsonBody.access_token)	
				getGoogleUserInfo(jsonBody.access_token, res)
			})
		})

		post_req.write(data);
		post_req.end()
	} else {
		res.send('200', '<html>state is ' + req.query.state + "</html");
	}
}

function getGoogleUserInfo(acToken, res) {

	https.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken, function(res1) {
		console.log(res1)
		var chunks = "";
		var response;
		res1.on('data', function(chunk) {
			console.log("chunk: " + chunk)
			chunks += chunk;
		})
		res1.on('end', function() {
			// { id: '106105613198083240886',
			//   email: 'camhart73@gmail.com',
			//   verified_email: true }
			response = {}
			response.body = JSON.parse(chunks);
			//user.addGoogleUser(response, res);
			user.userUpsert(response, res);
			console.log(response);
		})
	})
}

exports.googleAuth = googleAuth