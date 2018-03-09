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
//		var mongo = new Array();
//		var mongoi = 0;
//		var mysql = new Array();
//		var mysqli = 0;
		var falg = false;			//是否将下面types数组各元素的content添加入$scope.all中
		$scope.all = new Array();
//		console.log(res);
		/**
		 * 以上手动在代码中添加的信息从服务器端json文件读取
		 */
		$http.get('/json/articletype').then(function(res_json){
			console.log(res_json);
			var types = res_json.data.types;			//记录分类的数组里面有对象{'id':0,'type':****}
			
			/**
			 * data.contents是数组，将数组内容取出，绑定到scope的变量中
			 * 有可完善的地方，增加类型需要改动源代码   ////已经完善
			 */
			for(var i=0;i<res.data.contents.length;i++){
				var article = res.data.contents[i];
				for(var j=0;j<types.length;j++){
					//若类型相符就将文章添加入相应的容器中
					if(article.type=='string:'+types[j].type){		//数据库中取出来的type有string:前缀
						types[j].content[types[j].i++] = {
								'id':article.id,
								'type':article.type,
								'uptime':article.uptime,
								'author':article.author,
								'title':article.title,
								'content':converter.makeHtml(article.content)
						}
						break;		//只要执行了一次就可以跳出内循环
					}
				}
			}
			
			for(var i=0;i<types.length;i++){
				$scope.all[i] = types[i].content;			//将types各元素计算好的contnet放入scope中
			}
			console.log($scope.all);
		},function(err){
			console.error(err);
			return;			//err
		})	
	});
	/**************get mongo end !********************/
	
	$scope.gotoAnchor = function (x) {  
         
        console.log($location.hash(x));
        $anchorScroll();  
        //移动到锚点  
    };  
    
    
	
});


