/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");
var ObjectId = require('mongodb').ObjectId;
exports.addlanguage = function(req,res){
	var _id = ObjectId(req.body.id);	
	var language = req.body.language;
	var link = req.body.link;
//	console.log(_id);
	
	myMongo.exe(myMongo.hubLinks,_id,myMongo.selectData,function(db,err,result){
//		console.log(result);
		//res1用于将result的有用内容重组的新对象
		var res1 = {};
		res1.link = {};
		res1.link = result[0].link;
		res1.language = result[0].language;
		res1.link[language] = link; 
		res1.language.push(language);
		
//		console.log(res1);
		
		myMongo.updata(myMongo.hubLinks, {'_id':_id}, {$set:res1}, function(db,err,result) {
			if(err){
				res.json({'result':0});
			}else{
				res.json({'result':1});
			}
			db.close();
		})
		
		db.close();
	});	
}

/**
 * 删除整条记录
 */
exports.delDoc = function(req,res){
	var _id = ObjectId(req.body.id);
	
	myMongo.exe(myMongo.hubLinks,{"_id":_id},myMongo.removeData,function(db,err,result){
		if(err){
			res.json({'result':0});
		}else{
//			console.log(result);
			res.json({'result':1});
		}
		db.close();
	});
}

/**
 * 下面函数需要的工具函数，暂且放在这里
 * 对象原型写好
 */
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
exports.a = function(){
	console.log("I'm A!");
}
/***
 * 删除某条记录的语言以及link（链接到它的地方）
 */
exports.delLink = function(req,res){
	var _id = ObjectId(req.body.id);	
	var language = req.body.language;
//	console.log("测试是否响应");
//	console.log(_id);
//	console.log(language);
	myMongo.exe(myMongo.hubLinks,_id,myMongo.selectData,function(db,err,result){
//		console.log(result);
		var res1 = {};
		res1.link = {};
		res1.link = result[0].link;
		res1.language = result[0].language;
		delete res1.link[language];
		//删除language数组中某个值的元素
		res1.language.remove(language);
		//如果再删除就没有任何语言的代码了，那么就交给delDoc去工作
		if(res1.language.length==0){
			console.log("我要删除这个文档咯");
			exports.a();
			exports.delDoc(req,res);
			return;
		}
		/**
		 * 这儿有个问题，如果语言全部删除了，那么需要提醒下，如果要继续删除就将记录全部删除
		 */
		myMongo.updata(myMongo.hubLinks, {'_id':_id}, {$set:res1}, function(db,err,result) {
			if(err){
				res.json({'result':0});
			}else{
				res.json({'result':1});				
			}
			db.close();
		});
		db.close();
	});	
}


