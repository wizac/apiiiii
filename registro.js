function registro(db){
	return function(req, res){
			console.log("Entra registro");
			var user = { user : req.body.user,
				pass : req.body.pass};
			var users = db.get('users');
			users.find({ user : user.user}, function( err, doc){
				if(err) throw err;
				else{
					console.log(doc);
					if(doc.length != 0){
						res.send('Nombre de usuario no disponible.');
					}
					else{
						users.insert(user);
						res.send('Binenvenido ' + user.user + '!!!!');
					}
				}
			})
				
			}	
}

module.exports.registro = registro;
