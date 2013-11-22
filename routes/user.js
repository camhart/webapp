

var r = require('rethinkdb');
var user_tbl = 'user';

function User(firstname, lastname, age, email){
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
}

exports.add_user = function(req, res, connection){

    // use req, res to get User() from front end
    // email is primary key
    var firstname = 'ryan';
    var lastname = 'something';
    var age = 21;
    var email = 'abc@def'
    user = new User(firstname, lastname, age, email);
    addUserToDB(connection, user);
    res.sendfile("./public/vp.html");    
}

var addUserToDB = function(connection, user){
    r.tableList().run(connection, function(err, result){
        if (err) throw err;
        if(result.indexOf(user_tbl) == -1){
            r.tableCreate(user_tbl, {'primaryKey': 'email'}).run(connection, function(err, result){
                if (err) throw err;
                console.log('Created Table: ', result);
            });
        }
        r.table(user_tbl).insert(user).run(connection, function(err, result){
            if (err) throw err;
            if (result.errors != 0)
                console.log('ERROR: ', result.first_error);
            else
                console.log('ADDED: ', user);
        });   
    }); 
} 

exports.get_user = function(req, res, connection){
    r.table(user_tbl).run(connection, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            for(index in result)
                console.log(JSON.stringify(result[index], null, 2));
    });
    res.sendfile("./public/vp.html");   
});
}
