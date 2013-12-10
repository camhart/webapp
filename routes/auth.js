var https = require("https");
var app = require('../app.js')
var r = require('rethinkdb')

//don't change this redirectURL no matter what, even if on webserver it should stay the same
var redirectUrl = "http://localhost:8000/auth/google"
var googleSecret = "uxIocixkvihbjNzlnwBcAfWf"
var googleClientId = "85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com"

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
		// console.log("acToken: " + JSON.stringify(query))
		// console.log(tokenUrl);

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
			var dataBuffer = "";
			res.on('data', function(chunk) {
                dataBuffer += chunk
			})	
			res.on('end', function(res) {
                var json = JSON.parse(dataBuffer)
				console.log('access_token', json.access_token)
                return callback(null, json)
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

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name) {
    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
    var regexS = "[\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
        return "";
    else
        return results[1];
}

function getGoogleUserInfo(acToken) {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function(resp) {
        	console.log('here!')
            user    =   resp;
            console.log(user);
            // $('#uName').append(user.name);
            // $('#imgHolder').attr('src', user.picture);
        },
        dataType: "jsonp"
    });
}

function facebookAuth(query, callback){
    console.log('Facebook Login!')
    callback(null, query)
}

exports.facebookAuth = facebookAuth
exports.googleAuth = googleAuth