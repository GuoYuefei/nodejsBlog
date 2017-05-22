/**
 * http://usejsdoc.org/
 */
var http = require("http");
var fs = require("fs");
//http.createServer(function (request,response) {
//	//发送http头部 状态值200，表示正常，内容text/
//	response.writeHead(200,{'content-Type':'text/plain'});
//	
//	response.end('<!DOCTYPE html><html><head></head><body><h1>Hello World\n</h1></body></html>');
//}).listen(8888);
//console.log('Server running at http://127.0.0.1:8888');

var server = http.createServer();
var handleRequest=function(request,response){
	console.log(new Date()+"\t受到客服端请求,请求路径是"+decodeURI(request.url)+"\t\t请求方法是:"+request.method);
	var send = function(err,data){
		if (err) return console.error(err);
		response.write(data.toString());
		response.end();
	}
	switch (request.url){
		case "/favicon.ico":
			response.writeHead(200,{'content-Type':'image/x-icon'});
			fs.readFile("./20170509/images"+decodeURI(request.url),send);break;
		case "/" :
			fs.readFile("./20170509/1705091.html",send);break;
		//(request.url.match(".*images.*"))
		case "/images/flower-2232185_1920.jpg":
			response.writeHead(200,{'content-Type':'application/x-jpg'});
			console.log("do it!");
		//使用decode解析中文或者其他非ascii码文字
		default: fs.readFile("./20170509"+decodeURI(request.url),send);return;;	//将文件read出来发送出去
	}
}

server.on("request",handleRequest);

server.listen("8888",function(){
	console.log("Server running at http://localhost:8888");
});
