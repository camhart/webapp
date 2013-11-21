

var r = require('rethinkdb');

exports.adduser = function(req, res, connection){
    newuser = new User("ryan", "yoman", 21);
    console.log("New User: ", newuser);
    r.db('vp').table('user').insert(newuser).run(connection, function(err, result){
        if (err) throw err;
        console.log(result);
    });
    res.sendfile("./public/vp.html");    
};

exports.getusers = function(req, res, connection){
    r.db('vp').table('user').run(connection, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
    res.sendfile("./public/vp.html");    
};

function User(firstname, lastname, age){
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
}
