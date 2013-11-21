

var homepage = './public/vp.html';


exports.home = function(req, res){
    console.log("Main Page!");
    res.sendfile(homepage);
};

exports.login = function(req, res){
    console.log("Loggining In!");
    res.sendfile(homepage);
};

exports.logout = function(req, res){
    console.log("Loggining Out!");
    res.sendfile(homepage);
};