/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");
var ObjectId = require('mongodb').ObjectId;
exports.codeUpdata = function(req,res){
	var _id = ObjectId(req.body.id);	
	var language = req.body.language;
	var link = req.body.link;
//	console.log(_id);
	
	myMongo.exe("hubLinks",_id,myMongo.selectData,function(db,err,result){
//		console.log(result);
		var res1 = {};
		res1.link = {};
		res1.link = result[0].link;
		res1.language = result[0].language;
		res1.link[language] = link; 
		res1.language.push(language);
		
		console.log(res1);
		
		myMongo.updata("hubLinks", {'_id':_id}, {$set:res1}, function(db,err,result) {
			if(err){
				res.json({'result':0});
			}
			res.json({'result':1});
			db.close();
		})
		
		db.close();
	});
	
}