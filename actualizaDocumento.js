function actualizaDocumento(db)
{
	return function (req, res) {
		console.log("id del documento que se actualiza: " + req.body._id);
		var documentos = db.get("documentos");
		var IdDocumento = req.body._id;
		documentos.update({_id:IdDocumento},{$set:req.body},function (err) {
			if (err){
				throw err;
			}
			else{ 
			    res.send('Se actualizo el documento '+req.params.documentos+' con id '+IdDocumento);
			}
		});
	}
}

exports.actualizaDocumento = actualizaDocumento;