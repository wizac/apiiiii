function transferirDocumento(db)
{
	return function (req, res) {
		console.log("id del usuario que transferira el documento: " + req.decoded.id);
		var documentos = db.get("documentos");
		IdDocumento = req.body.idDocumento;
		var IdUsuarioNuevo = req.body.idUsuario;
	
		documentos.update({_id:IdDocumento},{$set:{dueno:IdUsuarioNuevo}},function (err) {
		if (err){
			throw err;
		}
		else{
			res.send('Se transfirio el documento '+req.params.documentos+' con id '+IdDocumento + ' al usuario con id' + IdUsuarioNuevo);
		}
		});
	
	}
}

exports.transferirDocumento = transferirDocumento;