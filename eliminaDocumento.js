function eliminaDocumento(db)
{
	return function (req, res) {
		console.log("id del documento que se elimina : " + req.body._id);
		var documentos = db.get("documentos");
		var IdDocumento = req.body.idDocumento; // pasar por post el id del documento con el campo idDocumento
		
		documentos.remove({_id:IdDocumento}, function (err) {
			if (err){
				throw err;
			}
			else{
				res.send('Se elimino el documento ' con id '+IdDocumento);
			}	
		});
	}
}

exports.eliminaDocumento = eliminaDocumento;