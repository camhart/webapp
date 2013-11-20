
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log(process.cwd());
  res.sendfile('./public/vp.html');
};