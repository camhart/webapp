

var db = require('./db')

function User(firstname, lastname, gender, email){
    this.firstname = firstname
    this.lastname = lastname
    this.gender = gender
    this.email = email
}

exports.add_user = function(req, res, connection){
    // use req to get User() from front end
    var firstname = 'ryan'
    var lastname = 'something'
    var age = 21
    var email = 'abc@def'
    user = new User(firstname, lastname, age, email)
    db.addUserToDB(connection, user, function(result){
        res.send('200', result)
    })
    // res.sendfile("./public/vp.html")
}

exports.get_user = function(req, res, connection){
    // email is primary key
    var email = 'abc@def'
    db.getUserFromDB(connection, email, function(user){
        // now we could porbably send user info to front end with 'res'
    })
    res.sendfile("./public/vp.html")   
}

