/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");
var fs = require('fs');
var rootpath = "./public/indexGo/public/databases/";
var typepath = "mongoDB/"
var files = [{id:0,title:'mongodb学习笔记.md',filename:'mongodb学习笔记.md',author:"Guo"},
	{id:1,title:'test.md',filename:'test.md',author:"Guo"}];



/**
 * 这个函数写时关键注意异步读取文件所带来的问题
 * 将mongoDB分类的所有文章发送到客户端
 */
exports.sendText = function(req,res){
	var num = 0;		//标志我读取了多少个文件了
	var contents = new Array();		//最后要传送的对象
//	console.log(files);
	/**
	 * @param file 是files的一个元素
	 */
	var myReadFile = function(req,res,file){
		var filepath = rootpath + typepath + file.filename;
		var id = file.id;
		var title = file.title;
		fs.readFile(filepath,function(err, data) {
//			console.log(err);
//			console.log(data);		
			var fcontent = data.toString();
			
//			console.log(fcontent);
			contents[id]={'title':title,'content':fcontent};
			if(++num==files.length){		//最后所有文件读取完成后以数组形式返回客户端所需数据
//				console.log("我被执行了");
				res.json({contents});				
			}
		});
	}
	for(var i=0;i<files.length;i++){
//		console.log(files[i]);
		myReadFile(req,res,files[i]);
	}
	
	
}