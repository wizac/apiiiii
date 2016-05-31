function registro(db){
	return function(req, res){
			var user = { user : req.body.usuario,
				pass : req.body.contrasena,
			}
			var users = db.get('usuario');
			users.find({ user : user.user}, function( err, doc){
				if(err) throw err;
				else{
					console.log(doc);
					if(doc.length != 0){
						res.send('Nombre de usuario no disponible.');
					}
					else{
						users.insert(user, function( err, doc){
							if(err) throw err;
							else{
								res.send('Binenvenido ' + user.user + '!!!!');
							}
						});
						
					}
				}
			})
				
			}	
}

module.exports.registro = registro;
