function insertarRol(db) {
	return function (req, res) {
		console.log("entro el insertarRol");
		var rol = db.get('rol');
		var nuevoRol = {
			"nombre": req.body.nombre,
			"permisos": req.body.permisos
		};
		rol.find({ nombre: nuevoRol.nombre }, function (err, doc) {
			if (err) throw err;
			else {
				if (doc.length != 0) {
					res.send('Ya existe un rol con ese nombre.');
				}
				else {
					rol.insert(nuevoRol, function (err, doc) {
						if (err) throw err;
						else {
							res("El rol " + nuevoRol.nombre + " ha sido insertado con éxito");
						}
					});
				}
			}
		});
	}
}

/* users.find({ user : user.user}, function( err, doc){
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
			})*/
function modificarRol(db) {
	return function (req, res) {

	}
}
function borrarRol(db) {
	return function (req, res) {

	}
}
function listarRol(db) {
	return function (req, res) {

	}
}
function asignarRol(db) {
	return function (req, res) {

	}
}
module.exports.insertarRol = insertarRol;
module.exports.modificarRol = modificarRol;
module.exports.borrarRol = borrarRol;
module.exports.listarRol = listarRol;
module.exports.asignarRol = asignarRol;

