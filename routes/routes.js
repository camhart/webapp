

var db = require('./db')

var HOMEPAGE = './public/vp.html'
var PROTOCOLPAGE = './test/protocol/protocol.html'
var OVERVIEWPAGE = './public/overview.html'

// static pages
function home(req, res){
    console.log("Main Page!")
    console.log(JSON.stringify(req.session, null, 4))
    if (req.session.passport.user)
    {
        console.log('Authorized home request')
        var cookie = ''
        if (req.session.passport.user.provider === 'google')
        {
            cookie = 'Google/' + req.session.passport.user._json.email/* + '/'
                + req.session.passport.user.id*/
        }
        else if (req.session.passport.user.provider === 'familysearch')
        {
            cookie = 'FamilySearch/' + req.session.passport.user.email/* + '/'
                + req.session.passport.user.id*/
        }
        else if (req.session.passport.user.provider === '')
        {
            cookie = 'Twitter/'
        }
        else if (req.session.passport.user.provider === '')
        {
            cookie = 'Facebook'
        }
        else if (req.session.passport.user.provider === '')
        {
            cookie = 'Github'
        }

        if (cookie !== '')
            res.cookie('vpauth', cookie)
        else
            res.clearCookie('vpauth')
    }
    else
        res.clearCookie('vpauth')

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
