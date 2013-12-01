r = require('rethinkdb');
// var dummy = require('../test/dummydata')
//u = require('../routes/user');
//dummy = require('../test/dummydata');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    console.log('connection opened')
    connection = conn;

    //usr = dummy.getDummyUser([0, 1, 2, 3]);
// usr = new dummy.Person(1, 0, "cam", "hart", "male");
//{"users": [{"givenname":"cameron", "surname":"hartmann", "afn":0, "gender":"male"},{"givenname":"braden", "surname":"hartmann", "afn":1, "gender":"male"}]
    // r.db('vp').table('user').insert(usr)
    //  .run(connection, function(err, result){
    //     if (err) throw err
    //     if(result == null) console.log('null result')
    //     else {
		    r.db('vp').table('user').run(connection, function(err, cursor) {
			    if (err) throw err;
			    cursor.toArray(function(err, result) {
			        if (err) throw err;
			        console.log(result);
			        console.log(JSON.stringify(result, null, 2));
			    });
			    connection.close(function() { console.log('connection closed')})
			});
        // }
    // }) 

})


