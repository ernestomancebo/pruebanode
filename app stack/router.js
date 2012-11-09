function route (handle, pathname, response, request) {
	console.log("Enruta a " + pathname);
	if(typeof handle[pathname] === 'function'){
		// return 
		handle[pathname](response, request);
	}else{
		console.log("No hay requesthandler para" + pathname);
		response.writeHead(404, {"Conten-Type":"text/plain"});
		response.write(pathname + " no encontrada (404)");
		response.end();
		// return "404 no encontrada"		
	}
}

exports.route = route;