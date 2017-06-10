/*
 * GET home page.
 */


exports.index = function(req, res){
//  res.render('public/indexGo/index', { title: 'Express' });
	res.sendfile('public/indexGo/index.html');
};

exports.codes = require("./codes.js").codes;

exports.codeBavi = require("./codeBavi.js").codeBavi;

