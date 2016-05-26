var puttag=module.exports={
	function put(db){
		return function(req, res)
		{
		var usuarios = db.get('usuarios');
		var colleccion = db.get('documentos');
		console.log("Inserting: ");
		console.log(req.body);

		var idusuario=req.decoded._id;
		//ver si esta mierda anda 
		colleccion.findById({dueno:idusuario}}, function(err,data){
			if (err) 
				throw err;

			//ver si esto me deja donde quiero
			data.documentos.findById(req.query._id, function(err,data){
				if (err) 
					throw err;
				//probar esto si es que anda
				colleccion.test.update( {"$pushAll" : {tags : data}}, function(err){
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