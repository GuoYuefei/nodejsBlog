/**
 * http://usejsdoc.org/
 */

var jq = $.noConflict();		//释放，避免和angular重合，因为angular有一部分也是$开头的

jq(document).ready(function(){

	//导航的动画
	jq("#flip").click(function(){
		jq("#panel").slideToggle("slow");	//slideDown()  slideUp()  你懂的这两个函数是干嘛的，只演示Toggle的那个
	});	
	

	

});




//在jquery中使用angularJs部分
var myApp = angular.module('myApp',['ngRoute','ngSanitize']);

//使用安全服务的过滤器
myApp.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});


myApp.controller("reList",function($scope,$rootScope){
	jq.ajaxSetup({ 		//设置同步，这是为了让全局变量存储
	    async : false 
	});  
	//返回的是json对象，里面有一个responseJSON的属性里面放了我们读取的json数据
	json1=jq.get("./json/navigationList.json",function(res){},dataType="json");
	
//	console.log("JSON:"+JSON.stringify(json1));
	$rootScope.list = json1.responseJSON.naviList;			//这个存储了导航条的json对象


});


myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/home.html',{templateUrl:'./home.html'})
    .when('/code.html',{templateUrl:'./code.html',controller:"showCode"})
    .when('/about.html',{templateUrl:'./about.html'})
    .when('/mongoDB.html',{templateUrl:'./mongoDB.html',controller:"mongoDB"})
    .otherwise({redirectTo:'home.html'});
}]);










