/**
 * http://usejsdoc.org/
 */
var myMongo = require("./../../tools/myMongo.js");

var parseTime = function(str){
	switch(str){
	case "1h":
		return 1000*60*60;
	case "1d":
		return 1000*60*60*24;
	case "1w":
		return 1000*60*60*24*7;
	case "1m":
		return 1000*60*60*24*30;
	}
}

exports.Login = function(req,res){
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var username = req.body.username;
	var passwd = req.body.passwd;
	var time = parseTime(req.body.time);
//	console.log(time+"leixing"+typeof time);
	
	myMongo.exe("users",{'id':username},myMongo.selectData, function(db,err,result) {
		console.log(result.length);
		if(err||result.length==0){
			res.set('Content-Type', 'text/html');
			res.end("Login failed!!!");
			console.log(err);
			db.close();
			return;
		}
		//用随机字符串代替密码，更加安全，比较cookie实在本地的
		if(passwd==result[0].passwd){
			var randomStr = "";
			for(var i=0;i<16;i++){
				var id = Math.floor(Math.random()*16);
		        randomStr += chars[id];
			}
			res.cookie("username", username, 
					{expires:new Date(Date.now()+time), httpOnly:true});
			res.cookie("flag", randomStr, 
					{expires:new Date(Date.now()+time), httpOnly:true});
			
			req.session.user = {
			        'username':username,
			        'randomStr':randomStr
			}
			
			res.redirect('/admin/admin.html');			//登录成功
		}else{
			res.end("Login failed!!!");
		}
		db.close();
	})
	
	
}