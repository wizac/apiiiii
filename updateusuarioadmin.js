module.exports={
	upd:  function (db){

	var usuarios = db.get('usuarios');	
	console.log("Editando: ");
	console.log(req.body);
	var idusuario=req.decoded.id;

	usuarios.find({_id:req.body._id}, function(err,data){
		if (err)
			throw err;
		console.log(data);
		if(data)
		{
			usuarios.update({_id:req.body._id},{"nombre":req.body.nombre,"usuario":req.body.usuario,"contrasena":req.body.contrasena,"rol":req.body.rol});
		}
	})
	}
}