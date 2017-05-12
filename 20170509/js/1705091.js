/**
 * http://usejsdoc.org/
 */

//避免count污染全局区
$(document).ready( function(){
	var count=0;
	$("button#myButton").click(function(){
		count++;
		document.getElementById("myButton").innerHTML = "我被单击了"+count+"次";
		p1=document.getElementById("p1");
		p2=document.getElementById("p2");
		p3=document.getElementById("p3");
		p3.innerHTML = p2.innerHTML;
		p2.innerHTML = p1.innerHTML;
		p1.innerHTML = count;
//		alert(count);
		document.getElementById("p"+(count%3+1)).style.visibility="visible";
		console.log('count='+count);
	});
});	

//下面两个函数也避免了污染全局区，函数自我调用
var add = (function(){
	var count = 1;
	return function(){
		console.log("conut="+count);
		return count++;
	}
})();
function mf(){
	document.getElementById("p4").innerHTML = add();
}

$(document).ready(function(){
	$("p#p1").click(function(){
		  //$(this).hide();       //这个是直接消失了，直接使用jQuery
		document.getElementById("p1").style.visibility="hidden";
	 });
	 $("p#p2").click(function(){
		document.getElementById("p2").style.visibility="hidden";
	});
	$("p#p3").click(function(){
		document.getElementById("p3").style.visibility="hidden";
	});
})