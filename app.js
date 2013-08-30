var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
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

// route for quotes
app.get('/q', function(req, res) {
  var URL = decodeURIComponent(req.param('u'));
  URL = "/proxy?src=" + URL.replace(/^http:\/\//i, '');
  var text = req.param('s')
  var start = decodeURIComponent(req.param('s'));
  var end = decodeURIComponent(req.param('e'));
  res.render('quote', { url: URL, start: start, end: end });
});

// proxy shit for the iframe because fuck same origin policy
app.get('/proxy', function(proxyReq, proxyRes) {
  var destParams = url.parse("http://" + proxyReq.param('src'));
  var reqOptions = {
    host : destParams.host,
    port : 80,
    path : destParams.pathname,
    method : "GET"
  };
  var req = http.request(reqOptions, function(res) {
        var headers = res.headers;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
        console.log(headers);
        proxyRes.writeHead(200, headers);
        
        res.on('data', function(chunk) {
            proxyRes.write(chunk);
        });

        res.on('end', function() {
            proxyRes.end();
        });
    });
    req.on('error', function(e) {
        console.log('An error occured: ' + e.message);
        proxyRes.writeHead(503);
        proxyRes.write("Error !!!");
        proxyRes.end();
    });
    req.end();
});

// route for main page
app.get('/', function(req, res){
  res.render('index', { title: 'Quote-It' });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
