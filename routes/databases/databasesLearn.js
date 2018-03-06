/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");
var fs = require('fs');
var files = [{id:0,title:'mongodb学习笔记.md',filename:'mongodb学习笔记.md',author:"Guo"},
	{id:1,title:'test.md',filename:'test.md',author:"Guo"}];
/**
 * 这个函数写时关键注意异步读取文件所带来的问题
 * 将mongoDB分类的所有文章发送到客户端
 */
exports.sendText = function(req,res){
	var num = 0;		//标志我读取了多少个文件了
	var contents = new Array();		//最后要传送的对象
	/**
	 * @param file 是files的一个元素
	 * 主要为了解决异步编程出现的问题，用file的属性记录各自的顺序，而不是有随机的读取速度决定
	 */
	var myReadFile = function(req,res,file){
		var filepath = file.path;
		var id = file.id;
		var title = file.title;
		var author = file.author;
		var uptime = file.uptime;
		var type = file.type;
//		console.log(file);
		
		fs.readFile(filepath,function(err, data) {	
			var fcontent = data.toString();
//			console.log(fcontent);
			contents[id]={'type':type,'id':id,'title':title,'author':author,'uptime':uptime,'content':fcontent};
			if(++num==files.length){		//最后所有文件读取完成后以数组形式返回客户端所需数据
//				console.log("我被执行了");
				res.json({contents});				
			}
		});
	}
	myMongo.exe(myMongo.dbaticles, {}, myMongo.selectData, function(db, err, result) {
//		console.log(result);
		files.length = 0;		//清空数组
		for(var id=0;id<result.length;id++){
			files[id] = result[id];
			files[id].id = id;
			myReadFile(req,res,files[id]);
		}
	});
}