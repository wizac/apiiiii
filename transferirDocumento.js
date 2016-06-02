function transferirDocumento(db)
{
	return function (req, res) {
		console.log("id del usuario que transferira el documento: " + req.decoded.id);
		var documentos = db.get("documentos");
		var IdUsuarioAntiguo = req.decoded.id;
		var IdUsuarioNuevo = req.body.idUsuario;
	
		documentos.find({dueno:IdUsuarioAntiguo},function(err,docs){
			if(err){
				throw err;
			}
			else{
				var IdDocumento = docs._id;
				documentos.update({_id:IdDocumento},{$set:{dueno:IdUsuarioNuevo}},function (err) {
				if (err){
					throw err;
				}
				else{
					res.send('Se transfirio el documento '+req.params.documentos+' con id '+IdDocumento + ' al usuario con id' + IdUsuarioNuevo);
				}
				});
		    }
	    });
	}
}

exports.transferirDocumento = transferirDocumento;