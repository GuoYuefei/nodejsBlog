
//jQuery("#b1").click(function(){
//	alert("I'm running!");
//	jQuery("#showc").text("I'm running!");
//	console.log("I'm running!");
//});
//<button type="button" id = "b1">实验</button>

//var myApp = angular.module('codeApp',[]);



//tr调用



function tr_m_over(x){
	x.style.backgroundColor='#f6f6f6';
}
function tr_m_out(x){
	x.style.backgroundColor='#ffffff';
}



myApp.controller("showCode",function($scope){

//	$http.get('./public/code/linear_list/LinearList.h').then(function(){
//		console.log(response.data);
//		$scope.codes = response.data;
//	});
	/**
	 * 动态css
	 */
//	var li = 0;
//	$scope.lip1 = function(){
//		li+=32;
//		$scope.leftNavi = {
//				'position':'absolute',
//				'left':'100px',
//				'top':li.toString()+'px'
//		} ;
//		console.log(li);
//	}
//	
	
	
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
	$scope.list=jQuery.get("/get=codeBavi",function(res){},dataType="json").responseJSON;
	
	/**
	 * 根据连接来获取属性
	 */
	$scope.codeToLink=function(a){
		//清楚默认事件
		event.preventDefault();
		$scope.hubs = jQuery.get(a.x.link,function(res){},dataType="json").responseJSON;
//		console.log(a.x.link);
	}
	
	
	//默认页面显示
	$scope.hubs = jQuery.get("/get=data_structure",function(res){},dataType="json").responseJSON;

	
	
	var temp = jQuery.get("./public/code/linear_list/LinearList.h",function(data,status){
	});
	$scope.codes = "\r\n"
	$scope.codes = $scope.codes+temp.responseText;
	var temp = jQuery.get("./public/code/linear_list/List.h",function(data,status){
	});
	$scope.codes = $scope.codes+"\r\n \n\n\n\n"+temp.responseText;
//	console.log(temp.responseXML);
	
});

