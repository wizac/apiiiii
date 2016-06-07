function eliminaDocumento(db) {
	return function (req, res) {
		var documentos = db.get("documentos");
		documentos.remove({ _id: req.body._id }, function (err) {
			if (err) {
				throw err;
			}
			else {
				documentos.findOne({ _id: req.body._id }, function(err, doc){
					if(err) throw err;					
					if(doc) {
						res.send("Fallo la eliminación del documento id: " + req.body._id);
					}
					else{
						res.send('Se elimino el documento con id: ' + req.body._id);
					}
				});
			}
		});
	}
}
exports.eliminaDocumentoAdmin = eliminaDocumentoAdmin;