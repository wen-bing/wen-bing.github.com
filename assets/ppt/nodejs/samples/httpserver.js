var http = require('http');
var server = http.createServer(function(request, response) {
    var body = 'hello world';
	response.writeHead(200, {
  		'Content-Length': body.length,
  		'Content-Type': 'text/plain' });
    response.write(body);
    response.end();
});
var port = 3500;
server.listen(port);
console.log("Http server listen on part: " + port);