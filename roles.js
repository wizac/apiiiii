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
		rol.findOne({ _id: req.body._id }, function (err, docRol) {
			if (err) throw err;
			else {
				if (docRol) {
					rol.update({ "_id": req.body._id }, { "nombre": req.body.nombre, "permisos": req.body.permisos }, function (err) {
						if (err) throw err;
						else {
							usuario.find({}).each(function (docUsuario) {
								if ("rol" in docUsuario) {
									if (docUsuario.rol._id == req.body._id) {
										rol.find({ "_id": req.body._id }, function (err, docRol2) {
											if (err) throw err;
											else {
												usuario.update({ "_id": docUsuario._id }, { "usuario": docUsuario.usuario, "contrasena": docUsuario.contrasena, "rol": docRol2[0] }, function (err) {
													if (err) throw err;
												});
											}
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
		rol.findOne({ "_id": req.body._id }, function (err, doc1) {
			if (err) throw err;
			else {
				if (doc1) {
					//elimina inconsistencias de la base
					usuario.find({}).each(function (doc) {
						if (doc.rol) {
							if (doc.rol._id == req.body._id) {
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

//el usuario tendrá que renombrar el id de usuario como u_ip y el de rol como r_ip
function asignarRol(db) {
	return function (req, res) {
		var usuario = db.get("usuario");
		var rol = db.get("rol");
		var u_id = req.body.u_id;
		var r_id = req.body.r_id;
		rol.findOne({ "_id": r_id }, function (err, docRol) {
			if (err) throw err;
			else {
				usuario.findOne({ "_id": u_id }, function (err, docUsuario) {
					if (err) throw err;
					else {
						usuario.update({ "_id": docUsuario._id},{"usuario": docUsuario.usuario, "contrasena": docUsuario.contrasena, "rol": docRol }, function (err) {
							if (err) throw err;
							else{
								res.send("El rol "+docRol.nombre+" fue asignado a "+docUsuario.usuario );
							}
						});
					}
				});
			}
		});
	}
}

module.exports.insertarRol = insertarRol;
module.exports.modificarRol = modificarRol;
module.exports.borrarRol = borrarRol;
module.exports.listarRol = listarRol;
module.exports.asignarRol = asignarRol;

