/**
 * http://usejsdoc.org/
 */


exports.getDBText = function(req,res,next){
	console.log("I'm run");
	console.log(req.body.name);
//	console.log(req.body.file);
	console.log(req.file);
	res.redirect("/admin/admin.html#/uploadDBText.html");
}