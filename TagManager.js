var puttag=module.exports={
	function put(db){
		return function(req, res)
		{
		var usuarios = db.get('usuarios');
		var colleccion = db.get('documentos');
		console.log("Inserting: ");
		console.log(req.body);

		var idusuario=req.decoded._id;
		colleccion.findById({dueño:idusuario}}, function(err,data){
			if (err) 
				throw err;
			data.documentos.findById(req.query._id, function(err,data){
				if (err) 
					throw err;
				colleccion.tags.insert(data, function(err){
					if (err) 
						throw err;
				});
			});

		res.json(0);
			

		})

		//colleccion.insert(req.body);
		//colleccion.findById(req.query._id, function(err,data) {
		//	if (err) 
		//		throw err;
		//	
		//	//colleccion.tags.insert(data, function(err){
		//		if (err) 
		//			throw err;
		//	});
		//});
//
		//res.json(0);
		//}
	}},

	function del(db)
	{

	}



};