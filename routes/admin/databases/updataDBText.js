/**
 * http://usejsdoc.org/
 */


exports.getDBText = function(req,res){
	console.log(req.body.name);
	console.log(req.body.file);
	console.log(req.files);
	res.redirect("/admin/admin.html#/uploadDBText.html");
}