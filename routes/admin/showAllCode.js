/**
 * http://usejsdoc.org/
 */

var myMongo = require("./../../tools/myMongo.js");

exports.showAllCode = function(req,res){
	var types = req.body.field;
	//IF里的东西是因为两个集合中，因为特殊所以分开写
	if(types=="查看全部"){
		myMongo.exe("hubLinks",{},myMongo.selectData,function(db,err,result) {
			console.log(result);
			res.json(result);
		});
		return;
	}else if(types=="PAT乙级"){
		myMongo.exe("hubLinks",{'types':'PAT1'},myMongo.selectData,function(db,err,result) {
			console.log(result);
			res.json(result);
		});
		return;
	}
	
	//其他情况可以直接用下面的执行
	myMongo.exe("hubLinks",{'types':types},myMongo.selectData,function(db,err,result) {
		console.log(result);
		res.json(result);
	});
	
	
	
//	console.log(req.body);
}