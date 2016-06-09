module.exports = {
	listarDocumentos: function(db){
		return function(req, res){
			var documentos = db.get('documentos');

			for (var k in req.body){
			    if (req.body.hasOwnProperty(k)) {
			        req.body[k] = new RegExp("^" + req.query[k]);
			    }
			}
			
			documentos.find(req.body,function(err,data) {
				if (err) throw err;
				res.json(data);
			});
		};
	},

	listarUsuarios: function(db){
		return function(req, res){
			var usuarios = db.get('usuario');

			for (var k in req.body){
			    if (req.body.hasOwnProperty(k)) {
			        req.body[k] = new RegExp("^" + req.body[k]);
			    }
			}
			
			usuarios.find(req.body,function(err,data) {
				if (err) throw err;
				res.json(data);
			});
		};
	}
};