/**
 * http://usejsdoc.org/
 */



adminApp.controller("showAllCode",function($scope,$rootScope,$http){
	
//	jQuery.ajaxSetup({ 		//设置同步，这是为了让全局变量存储
//	    async : false 
//	});  
	//这句借用了为code页面写的服务器内容，本来是为了显示code页面的二级导航用的
//	$scope.list=jQuery.get("/get=codeBavi",function(res){},dataType="json").responseJSON;
	
	$scope.updataLink = function(x){
		$scope.up_what = x;				//按模态框按钮时将该处按钮指代的需要更新的记录标记出来
//		console.log(x);
	}
	
	$scope.up = function(){
		var o = {"id":$scope.up_what._id,"language":$scope.language,"link":$scope.link}
		$http.post("/code/updata",o).then(function(res){
//			console.log(res.data);
			alert("更新成功！");
		},function(res){
			alert("更新失败！");
		});
//		console.log(o);
	}
	
	//在改变下拉选项后一直刷新数据
	$scope.submit = function(){
		$http.post("/showAllCode/sub_data",$scope.sub_data).then(function(res){
			$scope.hubs = res.data;
			console.log(res.data);
		},function(res){
			
		});
	}
	
	
	/**
	 * 还是用angular来通讯，不用设置同步
	 */
	$http.get("/get=codeBavi").then(function(res){
		res.data.push({'field':"查看全部",'link':'/get=allCode'});
		res.data.reverse();
//		console.log(res.data);
		$scope.list = res.data;
		$scope.sub_data = res.data[0];			//默认选择 查看全部
		$scope.submit();				//默认显示全部
	}, function(res){
		return;
	});
	

	
	
	
});
