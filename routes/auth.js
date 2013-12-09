var https = require("https");
//var http = require("http");
var app = require('../app.js')
var r = require('rethinkdb')

//don't change this redirectURL no matter what, even if on webserver it should stay the same
var redirectUrl = "http://localhost:8000/authcallback"//"http%3A%2F%2Flocalhost%3A8001%2Fauthcallback";
var googleSecret = "uxIocixkvihbjNzlnwBcAfWf"
var googleClientId = "85896237045-v3a9g9hinkeipt8idqnjimb97cu7anj2.apps.googleusercontent.com"

function googleAuth(req, res) {
	// var win = window.self;
    // var url =   window.self.document.URL;
    // acToken =   gup(url, 'access_token');
    // tokenType = gup(url, 'token_type');
    // expiresIn = gup(url, 'expires_in');
    // win.close();

    //validate token
    // https.get()

    //console.log("err:= " + error)
    if(req.query.error) {
    	res.send('200', "You must grant permission to use app.")
    } else if(req.query.state == "getCode"){
  
	    console.log("params: " + req.query.code);//req.protocol + "://" + req.get("host") + req.url)
	    // var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';	
	    var tokenUrl = "" ;//https://www.accounts.google.com/o/oauth2/token"
	    tokenUrl += "code=" + req.query.code;
	    tokenUrl += "&client_id=" + googleClientId;
	    tokenUrl += "&client_secret=" + googleSecret + "";
	    tokenUrl += "&redirect_uri=" + redirectUrl;
	    tokenUrl += "&grant_type=authorization_code";
	    console.log("here")
		// xmlhttp = new XMLHttpRequest();
		// xmlhttp.open("GET", VALIDURL + params.acToken, false)
		// xmlhttp.send(null)
		// console.log(JSON.stringify(xmlhttp.responseText));
		console.log("acToken: " + JSON.stringify(req.query))
		console.log(tokenUrl);

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
			var dataBuffer = "";
			res2.on('data', function(chunk) {
				console.log("response: " + chunk)
			})	
			res2.on('end', function() {
				//console.log('end!' + JSON.stringify(res2))
				res.send('200', 'done')
			})
		})

		post_req.write(data);
		post_req.end()

		console.log(post_req.data)
		console.log(post_req.body)

		// https.post(tokenUrl, function(res1) {
		// 	// console.log(res)
		// 	//console.log("Got respsonse: " + res1.data)
		// 	res.send('200', res1)
		// }).on('error', function(e) {
		// 	console.log("Got error" + e.message)
		// 	// req.send('200', "Google Auth Error")
		// })
	} else {
		res.send('200', '<html>state is ' + req.query.state + "</html");
	}

    // $.ajax({
    //     url: VALIDURL + params.acToken,
    //     data: null,
    //     success: function(responseText){  
    //     	console.log(responseText);
    //         getGoogleUserInfo(params.acToken);
    //     },  
    //     dataType: "jsonp"  
    // });
	// res.send('200', "You are now authorized.");
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

exports.googleAuth = googleAuth