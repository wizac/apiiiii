var jwt = require('jsonwebtoken');

module.exports = {
	login: function(db){
		return function(req, res) {
			var usuario = db.get('usuario');
			//console.log("authenticate " + JSON.stringify(req.body));

			usuario.findOne({ usuario: req.body.usuario }, function(err,data) {
				if (err) throw err;
				
				if(!data){
					res.json({ success: false, message: 'Autenticacion fallida. Usuario no encontrado.' });
				}else if(data){
					if (data.contrasena != req.body.contrasena) {
		        		res.json({ success: false, message: 'Autenticacion fallida. Contraseña incorrecta.' });
		        	}else{
						var token = jwt.sign({ id: data._id, usuario: data.usuario, rol: data.rol }, "secret");

			        	res.json({
				          	success: true,
					        message: 'Autenticacion exitosa.',
					        token: token
			        	});
					}
				}
			});
		}
	}
}