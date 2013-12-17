

var db = require('./db')

var HOMEPAGE = './public/vp.html'
var PROTOCOLPAGE = './test/protocol/protocol.html'
var OVERVIEWPAGE = './public/overview.html'

// static pages
function home(req, res){
    console.log("Main Page!")
    if (req.session.authorized)
    {
        console.log('Authorized home request')
        var auth = req.cookies.vpauth.split('/')
        var email = auth[0]
        var token = auth[1]
    }


    res.sendfile(HOMEPAGE)
}

function contact(req, res){
    console.log("Contact Page!")
    res.redirect('/')
}

function overview(req, res){
    console.log('Assignment Page!')
    res.sendfile(OVERVIEWPAGE)
}

function protocol(req, res){
    res.sendfile(PROTOCOLPAGE)
}

function resetdb(req, res){
    db.reset(function(results){
        console.log(results)
        var header = "<h1>Database Reset!</h1>"
        var output = "<p>" + JSON.stringify(results) + "<p>"
        res.send('200', header + output)
    })
}

exports.home = home
exports.contact = contact
exports.overview = overview
exports.protocol = protocol
exports.resetdb = resetdb
