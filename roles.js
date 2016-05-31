function insertarRol(db) {
	return function (req, res) {
		var rol = db.get('rol');
		var nuevoRol = {
			"nombre": req.body.nombre,
			"permisos": req.body.permisos
		};
		rol.find({ nombre: req.body.nombre }, function (err, doc) {
			if (err) throw err;
			else {
				if (doc.length != 0) {
					res.send('Ya existe un rol con ese nombre.');
				}
				else {
					rol.insert(nuevoRol, function (err, doc) {
						if (err) throw err;
						else {
							res.send("El rol " + nuevoRol.nombre + " ha sido insertado con éxito");
						}
					});
				}
			}
		});
	}
}

function modificarRol(db) {
	return function (req, res) {
		var rol = db.get('rol');
		var nuevoRol = {
			"nombre": req.body.nombre,
			"permisos": req.body.permisos
		};
		rol.find({ nombre: req.body.nombre }, function (err, doc) {
			if (err) throw err;
			else {
				if (doc.length != 0) {
					rol.update({"nombre":nuevoRol.nombre},{"permisos": nuevoRol.servicios});
				}
				else {
					res.send("No se registra ningun rol con ese nombre.");
				}
			}
		});
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

