/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../tools/myMongo.js");
//  
exports.jsStudy = function(req,res){
	myMongo.exe("hubLinks",{'types':'js的学习'},myMongo.selectData, function(db, result) {
		console.log(result);
		res.json(result);
		db.close();
	})
}