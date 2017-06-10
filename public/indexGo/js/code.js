/**
 * 
 */
//jQuery("#b1").click(function(){
//	alert("I'm running!");
//	jQuery("#showc").text("I'm running!");
//	console.log("I'm running!");
//});
//<button type="button" id = "b1">实验</button>

//var myApp = angular.module('codeApp',[]);

myApp.controller("showCode",function($scope){

//	$http.get('./public/code/linear_list/LinearList.h').then(function(){
//		console.log(response.data);
//		$scope.codes = response.data;
//	});
	
//	jQuery("#showc").load("./public/code/linear_list/LinearList.h");
	jQuery.ajaxSetup({ 		//设置同步，这是为了让全局变量存储
	    async : false 
	});  
	//
	/**
	 * 取得所需的json数组对象 用于显示导航
	 * 论述下，为什么这里的json数据来自数据库，而首页的导航来自json文件
	 * 其实很简单，哈哈哈，这里改动大，而且要动态的显示页面，而首页我人工就能完成
	 */
	
	$scope.list=jq.get("/get=codeBavi",function(res){},dataType="json").responseJSON;
	console.log(json1);
	
	var temp = jQuery.get("./public/code/linear_list/LinearList.h",function(data,status){
	});
	$scope.codes = "\r\n"
	$scope.codes = $scope.codes+temp.responseText;
	var temp = jQuery.get("./public/code/linear_list/List.h",function(data,status){
	});
	$scope.codes = $scope.codes+"\r\n \n\n\n\n"+temp.responseText;
//	console.log(temp.responseXML);
	console.log(temp);
//	console.log($scope.codes);
	
});

