/*
 * GET home page.
 */


exports.index = function(req, res){
//  res.render('public/indexGo/index', { title: 'Express' });
	res.sendfile('public/indexGo/index.html');
};

exports.codes = require("./codes.js").codes;

exports.codeBavi = require("./codeBavi.js").codeBavi;


exports.PAT1 = require("./PAT1.js").PAT1;
