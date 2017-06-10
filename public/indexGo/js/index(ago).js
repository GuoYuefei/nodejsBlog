// JavaScript Document

var jq = $.noConflict();		//释放，避免和angular重合，因为angular有一部分也是$开头的

jq(document).ready(function(){

	//导航的动画
	jq("#flip").click(function(){
		jq("#panel").slideToggle("slow");	//slideDown()  slideUp()  你懂的这两个函数是干嘛的，只演示Toggle的那个
	});		


});




//在jquery中使用angularJs部分
var myApp = angular.module('myApp',[]);

myApp.controller("reList",function($scope,$rootScope){
	jq.ajaxSetup({ 		//设置同步，这是为了让全局变量存储
	    async : false 
	});  
	//返回的是json对象，里面有一个responseJSON的属性里面放了我们读取的json数据
	json1=jq.get("./json/navigationList.json",function(res){},dataType="json");
	
	console.log("JSON:"+JSON.stringify(json1));
	$rootScope.list = json1.responseJSON.naviList;			//这个存储了导航条的json对象
	

	
	jq.ajaxSetup({ 		//再次设置异步请求
	    async : true
	});  
	//为链接设置异步请求
	$scope.toLink = function(a){
		console.log(a.x);
		event.preventDefault();
	
		//虽然控制台有个error，但是还是能正常运行。这个error讲了，我异步得到的<!DOCTYPE html>标志
		//不是我想要的。但是由于里面有js所以可以运行
		jq.getScript(a.x.link,function(res,status){			//getjs并执行它，还是这个函数省事
			jq("#main").html(res);
			console.log(res);
			console.log(status);
		});
	
		
//		jq.get(a.x.link,function(data){
////			console.log(data);
//			jq("#main").html(data);
//			console.log(jq("#main").find( "script")[0].src);
////			jq("#main").find( "script")[0].src
//
////			jq.get(jq("#main").find( "script")[0].src,function(datascript){
////				window.eval(datascript);
//////				jq("#main").html(data+'<script>'+datascript+'</script>');
////			},dataType="script")
//		});
//		jq("#main").load(a.x.link);			//局部刷新比angular的路由要简介，就用jquery的异步了
		//这里需要加运行js代码，不然异步后的页面不会执行html所包含的js代码
	}
});

myApp.controller("mainView",function($scope,$rootScope){
	//加载主页时在id=mian的div中加载主页
	console.log($rootScope.list[0]);
	$scope.toHome = function(){
		for(x in $rootScope.list){		//循环遍历找到name为home的链接进行加载
			console.log($rootScope.list[x].name);
			if($rootScope.list[x].name=="Home"){		
				jq("#main").load($rootScope.list[x].link);
			}
		}		
	}
});



