module.exports={
	put:  function (db){
		return function(req, res)
		{
		var usuarios = db.get('usuarios');
		var colleccion = db.get('documentos');
		console.log("Inserting: ");
		console.log(req.body.tags);
		var idusuario=req.decoded.id;
		colleccion.find({dueno:idusuario}, function(err,data){
			if (err) 
				throw err;
	//ver si esto me deja donde quiero
			colleccion.find({_id:req.body._id}, function(err,data){
				if (err) 
					throw err;
				if(data)
				{
					colleccion.update({_id:req.body._id},{"$push" : {tags:req.body.tags}}, function(err){
					if (err) 
						throw err;	
					});
					res.json("Tag insertado con exito");
				}
				else {
					res.json("No se inserto el tag");
				}
				
				
				
			});
		
		})
	}
}, 
	del: function(db){
		return function(req,res)
		{
			var usuarios = db.get('usuarios');
			var colleccion = db.get('documentos');
			console.log("Deleting tag: ");
			console.log(req.body.tags);
			var idusuario=req.decoded.id;
			colleccion.find({dueno:idusuario}, function(err,data){
			if (err) 
				throw err;
				colleccion.find({_id:req.body._id}, function(err,data){
					if (err) 
						throw err;
					colleccion.update({_id:req.body._id},{"$pull" : {tags :req.body.tags}}, function(err){
						if (err) 
							throw err;
					});
				});
			});

			res.json("Tag borrado con exito");
		}

	


}
}