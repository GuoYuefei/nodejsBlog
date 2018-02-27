/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../tools/myMongo.js");
var fs = require('fs');
var rootpath = "./public/indexGo/public/mongoDB/";
var files = ['mongodb学习笔记.md','test.md'];
exports.mongoText = function(req,res){
//	console.log(files);
	var num = 0;
	var contents = new Array();
	for(var i=0;i<files.length;i++){
//		console.log(files[i]);
		fs.readFile(rootpath+files[i],function(err, data) {
//			console.log(err);
//			console.log(data);
			var fcontent = data.toString();
//			console.log(fcontent);
			contents.push({'content':fcontent});
			if(++num==files.length){		//最后所有文件读取完成后以数组形式返回客户端所需数据
				res.json({contents});				
			}
		});
	}
	
}