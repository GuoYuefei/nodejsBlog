/**
 * http://usejsdoc.org/
 */
var fs = require("fs");
var myMongo = require("./../../tools/myMongo.js");

/**
 * 用于处理请求信息，注入到storefile中使用
 * @param req http request对象
 * @param res http response对象
 */
var dealinfo = (req,res) => {
	var temppath = req.file.stream.path;						//刚开始上传位子
	var dest = "./uploads/mongo/temp"+Date.now() +".md";		//最终保存的文件路径
	var author = req.cookies.username;				//上传者
	var uptime = new Date();						//上传的时间
	var ip = req.ip;								//上传的ip，不考虑代理
	var fileSourceName = req.file.originalName;		//文件最初的名字
	var textTitle = req.body.title;					//文章的标题、题目
	var type = req.body.type;			//在db大类里，是mysql呢还是mongo呢这是一个问题
//	console.log(typeof(type));
	// go on
	
	return {'source':temppath,
			'dest':dest,
			'author':author,
			'uptime':uptime,
			'ip':ip,
			'sourcename':fileSourceName,
			'title':textTitle,
			'type':type
	}
}

/**
 * 用于在storefile之后处理相关问题，主要处理记录数据到数据库的问题
 * @para
 */
var takeNodes = (doc) => {
	
}



/**
 * 处理接收文件，文件持久化
 * @param report_info 函数，用于处理提交信息，获得有用信息如果source
 * @param dest 文件最终保存路径，之后还需记录数据可
 * @param [mkdir] 该参数可以省略用于处理是否在没有改路径下创建文件夹
 * @param callback 回调函数用于将有用信息保存入数据库，和处理其他后续工作
 */
var storefile = (req,res,deal_info,mkdir,callback) => {
	var info = deal_info(req,res);
	try{
		fs.readFile(info.source,function(err,data){
			if(err){
				return console.error(err);
			}
			fs.writeFile(info.dest,data,{encoding:"utf8",mode:0666,flag:'w'},function(err){
				if(err){
					console.error(err);
					return;
				}
				console.log("保存成功");
				takeNode(info);
			});
		})		
	}catch(err){
		console.error(err);
		return;
	}
}

exports.getDBText = function(req,res,next){
//	console.log(req.body.name);
	console.log(req.cookies);
	console.log(req.file);
	storefile(req,res,dealinfo);
	res.redirect("/admin/admin.html#/uploadDBText.html");
}