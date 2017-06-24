/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");

exports.codeInsert = function(req,res){


	var ID = req.body.ID;
	var title = req.body.title;
	var types = req.body.type;
	var language = req.body.language;
	var link ={};
	link[language]=req.body.link;		//必须要这样，分两步走 language才会当变量用
	var remark = req.body.remark;
	var wantInsert = [{"ID":ID,"title":title,"types":types,"language":[language],
					"link":link,"remarks":remark}];
	myMongo.exe("hubLinks", wantInsert, myMongo.insertData, function(db,err,result) {
		if(err){
			res.end("err:"+err);
			db.close();
		}
		console.log(result);
		db.close();
	});
	res.end("ok!!!<br/>");
}
