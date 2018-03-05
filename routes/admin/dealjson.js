/**
 * http://usejsdoc.org/
 */
var fs = require('fs');

exports.articletype = (req,res) => {
	try{
		fs.readFile(__dirname+'./../../public/indexGo/json/articletype.json','utf8',function(err,data){
			if(err){
				console.error(err);
				res.json({result:0});
				return;
			}
//			console.log(data);
			var typej = JSON.parse(data);
//			console.log(typej);
			res.json(typej);
		});
	}catch(err){
		console.log(err);
		res.json({result:0});
		return;
	}
}

