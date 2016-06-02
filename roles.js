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
		var usuario = db.get('usuario');
		rol.find({ _id: req.body._id }, function (err, doc1) {
			if (err) throw err;
			else {
				if (doc1.length != 0) {
					rol.update({ "_id": req.body._id }, { "nombre": req.body.nombre, "permisos": req.body.permisos }, function (err) {
						if (err) throw err;
						else {
							usuario.find({}, { stream: true }).each(function (docx) {
								if (docx.rol != undefined) {
									if (docx.rol._id.localeCompare(req.body._id) == 0) {
										usuario.update({ "_id": docx._id }, { "usuario": docx.usuario, "contrasena": docx.contrasena, "rol": nuevoRol }, function (err) {
											if (err) throw err;
											console.log("actualizo " + docx.usuario);
										});
									}
								}
							});
						}
					});
					res.send("El rol se modifico con éxito");
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
		rol.find({ "_id": req.body._id }, function (err, doc1) {
			if (err) throw err;
			else {
				if (doc1.length != 0) {
					//elimina inconsistencias de la base
					usuario.find({}).each(function (doc) {
						if (doc.rol != undefined) {
							if (doc.rol._id.localeCompare(req.body._id) == 0) {
								usuario.update({ "_id": doc._id }, { "usuario": doc.usuario, "contrasena": doc.contrasena }, function (err, doc) {
									if (err) throw err;
								});
							}
						}
					});
					//borra el rol de la base definitivamente
					rol.remove({ "_id": req.body._id }, function (err) {
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

//el usuario de front-end tendrá que renombrar el ip de usuario como u_ip y el de rol como r_ip
function asignarRol(db) {
	return function (req, res) {
		var u_id = req.body.u_id;
		var r_id = req.body.r_id;
		db.collections.rol.find({ "_id": r_id }, function (doc) {
			db.collections.usuario.find({ "_id": u_id }, function (docx) {
				db.collections.usuario.update({ "_id": docx._id, "usuario": docx.usuario, "contrasena": docx.contrasena, "rol": doc }, function (err) {
					if (err) throw err;
				});
			});
		});
	}
}

module.exports.insertarRol = insertarRol;
module.exports.modificarRol = modificarRol;
module.exports.borrarRol = borrarRol;
module.exports.listarRol = listarRol;
module.exports.asignarRol = asignarRol;

