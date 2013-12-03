r = require('rethinkdb')
appdata = require('../app')


var con = null;
r.connect( {host: appdata.db_host, port: appdata.db_port, db: appdata.db_name}, function(err, connection) {
    if (err) {
        console.log(err)
        console.log('ERROR: Running Without Rethinkdb!')
        return
    }
    con = connection
    exports.con = con
})

r.db(appdata.db_name).table(appdata.tbl_user).run(con, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});

// con.close(function() {
// 	console.log('closed')
// })