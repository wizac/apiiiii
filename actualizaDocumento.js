function actualizaDocumento(db)
{
	return function (req, res) {
		console.log("id del documento que se actualiza: " + req.body._id);
		var documentos = db.get("documentos");
		var IdDocumento = req.body.idDocumento; //pasar por post el id del documento con el campo idDocumento
		var actualizacion = req.body;
		delete actualizacion.idDocumento;
		
		documentos.findOne({_id:IdDocumento}, function(err, doc){
			if (err){
				throw err;
			}
			if(!doc){
				res.send('El documento con el id: '+IdDocumento+" no existe");
			}
			else{
				documentos.update({_id:IdDocumento},{$set:actualizacion},function (err) {
					if (err){
						throw err;
					}
					else{ 
						res.send('Se actualizo el documento con id '+IdDocumento);
					}
				});
			}
		});
	}
}

exports.actualizaDocumento = actualizaDocumento;