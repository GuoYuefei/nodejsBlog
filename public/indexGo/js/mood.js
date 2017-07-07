/**
 * http://usejsdoc.org/
 */

             

myApp.controller("mood",function($scope,$http,$sce){
	
	showdown.setFlavor('github');			//风格设置为github
//终于看到像java的代码了
	var converter = new showdown.Converter();   
	
	console.log(converter.getOptions());
	/**
	 * 使支持设置图像的尺寸在减记语法。 例子:
	 * ![foo](foo.jpg =100x80)     simple, assumes units are in px
	 */
//	converter.setOption('parseImgDimensions', true);
//	converter.setOption('tables',true);
//	converter.setOption('parseImgDimensions', true);
	$http.get("./public/mood/mongodb学习笔记.md").then(function(res){
		$scope.test = converter.makeHtml(res.data);
	});
	
	
	
});


