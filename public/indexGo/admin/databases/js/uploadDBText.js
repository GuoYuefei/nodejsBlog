/**
 * http://usejsdoc.org/
 */
adminApp.controller("uploadDBText",function($scope,$rootScope,$http){
	$http.get('/json/articletype').then(function(res){
		console.log(res);
		$scope.types = res.data.types;			//记录分类的数组里面有对象{'id':0,'type':****}
		$scope.articletype=$scope.types[0].type;
//		console.log($scope.articletype);
	},function(err){
		console.error(err);
		return;			//err
	})	
	
	
});