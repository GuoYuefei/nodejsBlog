/**
 * 用于显示PAT乙级的页面
 */
var myMongo = require("./../tools/myMongo.js");
//  
exports.PAT1 = function(req,res){
	myMongo.exe("hubLinks",{'types':'PAT1'},myMongo.selectData, function(db,err,result) {
//		console.log(result);
		res.json(result);
		db.close();
	})
}

//PAT1();

