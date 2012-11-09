var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		// var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Un request de " + pathname);
		// var content = 
		// request.setEncoding("utf8");

		// request.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("Recibido: " + postDataChunk);
		// });

		// request.addListener("end", function(){
		route(handle, pathname, response, request);
		// });		
		// response.writeHead(200, {"content-Type" : "text/plain"});
		// response.write(content);
		// response.end();
	}

	http.createServer(onRequest).listen(8080);
	console.log("Iniciado");
}

exports.start = start;