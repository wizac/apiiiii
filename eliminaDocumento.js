function eliminaDocumento(db)
{
	console.log("id del documento que se elimina : " + req.body._id);
	var documentos = db.get("documentos");
	var IdDocumento = req.body._id;
	documentos.remove({_id:IdDocumento}, function (err) {
		if (err) throw err;
		else res.send('Se elimino el documento '+req.params.documentos+' con id '+IdDocumento);
	});
}

module.export = eliminaDocumento;