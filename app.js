
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , chksession=require('./routes/checksession')
  , http = require('http')
  , path = require('path');


var session = require('client-sessions');
var home = require('./routes/home');

var app = express();

app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',home.signin);
app.get('/users', user.list);
app.get('/signin', home.signin);
app.get('/signup', home.signup);
app.post('/afterSignUp', home.afterSignUp);
app.post('/afterSignIn', home.afterSignIn);

app.post('/checksession/validate',chksession.validate);
app.get('/checksession/show',chksession.show);
app.get('/checksession/logout',chksession.logout);
app.get('/checksession/confirmOrder',chksession.confirmOrder);
app.get('/checksession/newOrder',chksession.newOrder);
app.post('/checksession/remove',chksession.remove);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
