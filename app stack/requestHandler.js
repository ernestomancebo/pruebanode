var exec = require("child_process").exec, 
	queryString = require("querystring"), 
	fs = require("fs"), 
	formidable = require("formidable"),
	mime = require("mime");

function start(response, request){
	console.log("request handler 'start'");

var body = '<html>'+
				'<head>'+
					'<meta http-equiv="Content-Type" content="text/html; '+
						'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
					'<form action="/upload" enctype="multipar/form-data" method="post">'+
						'<input type="file" name="upload"/>'+ //'<textarea name="text" rows="20" cols="60"></textarea>'+
						'<input type="submit" value="Subir Archivo" />'+
					'</form>'+
				'</body>'+
			'</html>';
response.writeHead(200, {"Content-Type" : "text/html"});
response.write(body);
response.end();

	// var content = "empty";

	// exec("find /", 
	// 	{timeout: 10000, maxBuffer: 20000 * 1024}
	// 	, function(error, stdout, stderr){
	// 	response.writeHead(200, {"Content-Type" : "text/plain"});
	// 	response.write(stdout);
	// 	response.end();
	// 	//content = stdout;
	// });

	// function sleep(milliseconds){
	// 	var startTime = new Date().getTime();
	// 	while(new Date().getTime() < startTime+milliseconds);
	// }
	// sleep(10000);
	//return content;
}

function upload (response, request) {
	console.log("request handler 'upload'");
	var form = new formidable.IncomingForm();

	form.parse(request, function(error, fields, files){
		// fs.rename(files.upload.path, "/tmp/test.jpg", function(err){
		if(error){
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
			return;
		}
		// 	if(err){
		// 		fs.unlink("/tmp/test.jpg");
		// 		fs.rename(files.upload.path, "/tmp/test.jpg");
		// 	}
		// });
		fs.renameSync(files.upload.path, "/tmp/"+files.upload.name);
		response.writeHead(200, {"Content-Type" : "text/html"});
		// response.write("Has escrito: " + queryString.parse(postData).text);
		response.write("Imagen: <br>");
		response.write("<img src='/show?i=" + files.upload.name + "'>");
		response.end();
		//return "upload";
	});

	
}

function show(response){
	console.log("request handler 'show'");
	var image = querystring.parse(url.parse(request.url).query).i;

	if(!image){
		response.writeHead(500, {"Content-Type" : "text/plain"});
		response.write(error + "\n");
		response.end();
		return;
	}

	fs.readFile("/tmp/"+image, "binary", function(error, file){
			if(error){
				response.writeHead(500, {"Content-Type" : "text/plain"});
				response.write(error + "\n");
				response.end();
				return;
			}

			type = mime.lookup(file);
			response.writeHead(200, {"Content-Type" : type});
			response.end(file, "binary");
		//else{
			// var type = "";
			// response.writeHead(200, {"Content-Type" : "image/jpg"});
			// response.write(file, "binary");
			// response.end();
			// return;
		// }
	});
}


exports.start = start;
exports.upload = upload;
exports.show = show;