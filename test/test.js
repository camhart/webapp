r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    console.log('connection opened')
    connection = conn;
    r.db('vp').table('user').run(connection, function(err, cursor) {
	    if (err) throw err;
	    cursor.toArray(function(err, result) {
	        if (err) throw err;
	        console.log(result);
	        console.log(JSON.stringify(result, null, 2));
	    });
	    connection.close(function() { console.log('connection closed')})
	});
})


