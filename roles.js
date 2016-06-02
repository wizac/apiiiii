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
			"_id": req.body._id,
			"nombre": req.body.nombre,
			"permisos": req.body.permisos
		};
		rol.find({ _id: nuevoRol._id }, function (err, doc) {
			if (err) throw err;
			else {
				if (doc.length != 0) {
					rol.update({ "_id": nuevoRol._id }, { "nombre": nuevoRol.nombre, "permisos": nuevoRol.permisos }, function (err, doc) {
						if (err) throw err;
						else {
							res.send("El rol se modifico con éxito");
						}
					});
				}
				else {
					res.send("No se registra dicho rol.");
				}
			}
		});
	}
}

function borrarRol(db) {
	return function (req, res) {
		var rol = db.get('rol');
		var usuario = db.get('usuario');
		var nuevoRol = {
			"_id": req.body._id,
		};

		rol.find({ "_id": req.body._id }, function (err, doc1) {
			if (err) throw err;
			else {
				if (doc1.length != 0) {
					//elimina inconsistencias de la base
					db.collections.usuario.find({}).each(function (doc) {
						console.log(doc.rol._id + " id objeto");
						console.log(nuevoRol._id + " id postman");
						if (doc.rol._id.localeCompare(nuevoRol._id) == 0) {
							console.log("entra en el if");
							var user = {
								"_id": doc._id,
								"usuario": doc.usuario,
								"contrasena": doc.contrasena
							}
							db.collections.usuario.update({ "_id": user._id }, { "usuario": user.usuario, "contrasena": user.contrasena }, function (err, doc) {
								if (err) throw err;
								else {
									console.log("se borro el rol de" + user.usuario);
								}
							});
						}
					});

					//borra el rol de la base definitivamente
					rol.remove(nuevoRol, function (err, doc) {
						if (err) throw err;
						else {
							res.send("El rol se elimino con éxito.");
						}
					});
				}
				else {
					res.send("No se registra dicho rol.");
				}
			}
		});
	}
}

function listarRol(db) {
	return function (req, res) {
		var rol = db.get('rol');
		for (var i in req.body) {
			if (req.body.hasOwnProperty(i)) {
				req.body[i] = new RegExp("^" + req.body[i]);
			}
		}
		rol.find(req.body, function (err, data) {
			if (err) throw err;
			res.json(data);
		});
	}
}

function asignarRol(db) {
	return function (req, res) {
		var rol = db.get("rol");
		var usuario = db.get("usuario");

	}
}
module.exports.insertarRol = insertarRol;
module.exports.modificarRol = modificarRol;
module.exports.borrarRol = borrarRol;
module.exports.listarRol = listarRol;
module.exports.asignarRol = asignarRol;

