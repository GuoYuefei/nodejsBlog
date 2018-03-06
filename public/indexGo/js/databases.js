/**
 * http://usejsdoc.org/
 */
//有框架自带的date过滤器代替
//myApp.filter('formattime',function(){
//	return function(time){
////		console.log('lalalala');
//		return time.slice(0,10);
//	}
//})

myApp.filter('delstring',function(){
	return function(type){
		return type.slice(7,type.length);			//type前面原本有string：标记，去除显示
	}
})             

myApp.controller("database",function($scope,$http,$sce,$location,$anchorScroll){
	
	showdown.setFlavor('github');			//风格设置为github
//终于看到像java的代码了
	var converter = new showdown.Converter();   
	
//	console.log(converter.getOptions());
	/**
	 * 使支持设置图像的尺寸在减记语法。 例子:
	 * ![foo](foo.jpg =100x80)     simple, assumes units are in px
	 * 100x80不是100*80
	 */
	converter.setOption('parseImgDimensions', true);
//	converter.setOption('tables',true);
//	converter.setOption('parseImgDimensions', true);
	$http.get("./public/databases").then(function(res){
		var mongo = new Array();
		var mongoi = 0;
		var mysql = new Array();
		var mysqli = 0;
		$scope.all = [mongo,mysql];
//		console.log(res);
		/**
		 * data.contents是数组，将数组内容取出，绑定到scope的变量中
		 * 有可完善的地方，增加类型需要改动源代码
		 */
		for(var i=0;i<res.data.contents.length;i++){
			var article = res.data.contents[i];
			if(article.type=='string:mongo'){
				mongo[mongoi++] = {
						'id':article.id,
						'type':article.type,
						'uptime':article.uptime,
						'author':article.author,
						'title':article.title,
						'content':converter.makeHtml(article.content)
				}
			}else if(article.type=='string:mysql'){
				mysql[mysqli++] = {
						'id':article.id,
						'type':article.type,
						'uptime':article.uptime,
						'author':article.author,
						'title':article.title,
						'content':converter.makeHtml(article.content)
				}
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


