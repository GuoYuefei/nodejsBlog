/**
 * http://usejsdoc.org/
 */
adminApp.controller("uploadDBText",function($scope,$rootScope,$http){
	$http.get('/admin/json/articletype').then(function(res){
		console.log(res);
		$scope.types = res.data.types[0].classification;
		$scope.articletype=$scope.types[0];
	},function(err){
		console.error(err);
		return;			//err
	})	
});