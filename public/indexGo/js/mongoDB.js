/**
 * http://usejsdoc.org/
 */

             

myApp.controller("mongoDB",function($scope,$http,$sce,$location,$anchorScroll){
	
	showdown.setFlavor('github');			//风格设置为github
//终于看到像java的代码了
	var converter = new showdown.Converter();   
	
//	console.log(converter.getOptions());
	/**
	 * 使支持设置图像的尺寸在减记语法。 例子:
	 * ![foo](foo.jpg =100x80)     simple, assumes units are in px
	 */
//	converter.setOption('parseImgDimensions', true);
//	converter.setOption('tables',true);
//	converter.setOption('parseImgDimensions', true);
	$http.get("./public/mongoDB").then(function(res){
		$scope.test = new Array();
		console.log(res);
		/**
		 * data.contents是数组，将数组内容取出，绑定到scope的变量中
		 */
		for(var i=0;i<res.data.contents.length;i++){
			$scope.test[i] = {
					'id':'section-'+i,
					'content':converter.makeHtml(res.data.contents[i].content)
			}
		}
	});
	/**************get mongo end !********************/
	
	$scope.gotoAnchor = function (x) {  
         
        console.log($location.hash(x));
        $anchorScroll();  
        //移动到锚点  
    };  
    
    
	
});


