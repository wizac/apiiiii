function registro(db){
	return function(req, res){
			var usuario = { usuario : req.body.usuario,
				contrasena : req.body.contrasena,
			}
			var usuarios = db.get('usuario');
			usuarios.find({ usuario : usuario.usuario}, function( err, doc){
				if(err) throw err;
				else{
					console.log(doc);
					if(doc.length != 0){
						res.send('Nombre de usuario no disponible.');
					}
					else{
						usuarios.insert(usuario, function( err, doc){
							if(err) throw err;
							else{
								res.send('Binenvenido ' + usuario.usuario + '!!!!');
							}
						});
						
					}
				}
			})
				
			}	
}

module.exports.registro = registro;
