function transferirDocumento(db)
{
	return function (req, res) {
		console.log("id del usuario que transferira el documento: " + req.decoded.id);
		var documentos = db.get("documentos");
		IdDocumento = req.body.idDocumento; // pasar por post el id del documento con el campo idDocumento
		var IdUsuarioNuevo = req.body.idUsuario; // pasar por post el id del usuario al que se le dara el documento con el campo idUsuario
		
		documentos.update({_id:IdDocumento},{$set:{dueno:IdUsuarioNuevo}},function (err) {
		if (err){
			throw err;
		}
		else{
			res.send('Se transfirio el documento '+' con id '+IdDocumento + ' al usuario con id' + IdUsuarioNuevo);
		}
		});
	
	}
}

exports.transferirDocumento = transferirDocumento;