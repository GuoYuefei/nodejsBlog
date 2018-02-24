
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , cookie = require('cookie-parser')
  , session = require('express-session')
  , MongoStore  = require('connect-mongo')(session);

var app = express();

// all environments
app.set('httpport', process.env.PORT || 80);
app.set('httpsport',443);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon("./favicon.ico"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cookie('WBLOG'));			//需要在router和static之前
app.use(session({
	'secret':'WBLOG',
	resave:false,
	saveUninitialized:true,
	//用数据库存储，降低响应速度，但是服务器重启session还在，并且减少内存开支
	'store':new MongoStore({
		'url':'mongodb://127.0.0.1/indexGo',
		'collection':'sessions',// 存在哪个集合里，默认为sessions	
		'ttl':60*60*24*30, // session过期时间 设为30天
		'autoRemove': 'native',// mongo2.2+自动移除过期的session，disable为禁用
		'autoRemoveInterval': 120, //移除过期session间隔时间,默认为120分钟
		'touchAfter': 10 //同步session间隔，默认每次请求都会同步到数据库
	})
})
);
app.use(express.logger('dev'));
app.use("/admin/", routes.authFilter);		//放在路由之前

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/indexGo')));


var bodyParser = require('body-parser');
//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}





app.get('/', routes.index);
app.get('/code',routes.codes);
app.get('/admin/admin.html',routes.admin);

app.get('/users', user.list);

app.get("/get=codeBavi",routes.codeBavi);
app.get('/get=PAT1',routes.PAT1);
app.get('/get=data_structure',routes.data_structure);
app.get('/get=jsStudy',routes.jsStudy);
app.get('/Logout',routes.Logout);

app.post('/admin/codeInsert',urlencodedParser,routes.codeInsert);
app.post('/Login',urlencodedParser,routes.Login);
app.post("/showAllCode/sub_data",urlencodedParser,routes.showAllCode);
app.post("/code/addlanguage",urlencodedParser,routes.addlanguage);
app.post("/code/delLink",urlencodedParser,routes.delLink);



http.createServer(app).listen(app.get('httpport'), function(){
  console.log('Express http server listening on port ' + app.get('httpport'));
});
//https.createServer(options, app).listen(app.get('httpsport'),function(){
//	console.log('Express https server listening on port' + app.get('httpsport'));
//});