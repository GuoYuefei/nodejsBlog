// JavaScript Document

$(document).ready(function(){

	//导航的动画
	$("#flip").click(function(){
		$("#panel").slideToggle("slow");	//slideDown()  slideUp()  你懂的这两个函数是干嘛的，只演示Toggle的那个
	});		


});




//在jquery中使用angularJs部分
var myApp = angular.module('myApp',[]);

myApp.controller("reList",function($scope,$rootScope){
	$.ajaxSetup({ 		//设置同步，这是为了让全局变量存储
	    async : false 
	});  
	//返回的是json对象，里面有一个responseJSON的属性里面放了我们读取的json数据
	json1=$.get("./json/navigationList.json",function(res){},dataType="json");
	
	console.log("JSON:"+JSON.stringify(json1));
	$rootScope.list = json1.responseJSON.naviList;			//这个存储了导航条的json对象
	

	
	$.ajaxSetup({ 		//再次设置异步请求
	    async : true
	});  
	//为链接设置异步请求
	$scope.toLink = function(a){
		console.log(a.x);
		event.preventDefault();
		$("#main").load(a.x.link);			//局部刷新比angular的路由要简介，就用jquery的异步了
	}
});

myApp.controller("mainView",function($scope,$rootScope){
	//加载主页时在id=mian的div中加载主页
	console.log($rootScope.list[0]);
	$scope.toHome = function(){
		for(x in $rootScope.list){		//循环遍历找到name为home的链接进行加载
			console.log($rootScope.list[x].name);
			if($rootScope.list[x].name=="Home"){		
				$("#main").load($rootScope.list[x].link);
			}
		}		
	}
});



