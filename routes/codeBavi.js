/**
 * 用与回应客户端放出的codeBavi请求
 * code页面的导航需要的json数据
 */
var myMongo = require("./../tools/myMongo.js");

exports.codeBavi = function(req,res){
	console.log(myMongo);
	myMongo.exe("codetype",{},myMongo.selectData,function(db,err,result){
		console.log(result);
		res.json(result);
		db.close();
	});
}



//单元测试成功
//require("./codeBavi.js").codeBavi();



