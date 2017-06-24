/**
 * 权限过滤器
 */

exports.authFilter = function(req,res,next){
//	console.log(req.session);
	
//	console.log(req.cookies);
	try{
		sessionUser = req.session.user.username;
		cookieUser = req.cookies.username;
		sessionStr = req.session.user.randomStr;
		cookieStr = req.cookies.flag;
	}catch(e){									//如果username不存在就退出
		res.set('Content-Type', 'text/html');
		res.end("Please login first!");
		return;
	}
	
	//无需验证密码了，因为之前验证过了，所以cookies中只要放username和与seesion对于的flag就好
	if(sessionUser==cookieUser&&sessionStr==cookieStr){	
		next();		
	}else{
		res.end("Please login first!");
	}
	
}

