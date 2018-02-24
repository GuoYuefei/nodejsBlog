/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../tools/myMongo.js");
//  
exports.data_structure = function(req,res){
	myMongo.exe("hubLinks",{'types':'data_structure'},myMongo.selectData, function(db,err,result) {
//		console.log(result);
		res.json(result);
		db.close();
	})
}