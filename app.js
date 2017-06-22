
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon("./favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
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
app.get('/users', user.list);
app.get("/get=codeBavi",routes.codeBavi);
app.get('/get=PAT1',routes.PAT1);
app.get('/get=data_structure',routes.data_structure);
app.get('/get=jsStudy',routes.jsStudy);


app.post('/admin/codeInsert',urlencodedParser,routes.codeInsert);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
