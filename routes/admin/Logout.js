/**
 * http://usejsdoc.org/
 */
exports.Logout = function(req,res){
	cookieUser = req.cookies.username;
	cookieStr = req.cookies.flag;
	//清空cookies 只要设置失效时间是当前就好
	res.cookie("username",
			{expires:-1, httpOnly:true});
	res.cookie("flag",
			{expires:-1, httpOnly:true});
	res.redirect('/admin/admin.html');
}