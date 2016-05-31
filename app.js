var db = require('monk')('localhost/apiiiii');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var registro = require('./registro');
var insertarRol = require('./roles');
var mario = require('./mario');

var tag=require('./TagManager.js');
var autenticacion = require('./login.js');
var listar = require('./listarDocumentosYUsuarios.js');


app.use(bodyParser.json());

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

//-----------------------------------------------------------

app.post('/api/insertarDocumento', mario.documentoPut(db));

app.post('/api/insertarTag', tag.put(db));

app.post('/api/borrarTag', tag.del(db));

app.post('/api/listarDocumentos', listar.listarDocumentos(db));

app.post('/autenticacion', autenticacion.login(db));

app.post('/registro', registro.registro(db));

app.get('/api/compartirDocumento', function(){});

app.get('/api/borrarDocumento', function(){});

app.post('/api/modificarDocumento', function(){});

app.post('/api/insertarRol', insertarRol.insertarRol(db));

app.post('/api/modificarRol', function(){});

app.post('/api/borrarRol', function(){});

app.get('/api/listarRol', function(){});

app.post('/api/asignarRol', function(){});

app.post('/api/insertarUsuario', mario.usuarioPut(db));

app.post('/api/modificarUsuario', function(){});

app.get('/api/borrarUsuario', function(){});

app.post('/api/listarUsuarios', listar.listarUsuarios(db));


//--------------------------------------------------

apiRoutes.use(function(req, res, next) {
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];
  	if (token) {
	    jwt.verify(token, "secret", function(err, decoded) {      
	      if (err) {
	      	console.log(err);
	        return res.json({ success: false, mensaje: 'Fallo la autenticacion del token.' });
	      } else {
	        req.decoded = decoded;

	        var tienePermiso = false;
	        var urlPath = req.url.substring(0, req.url.indexOf('?'));
	        
	        for (var i = 0; i < req.decoded.rol.permisos.length; i++){
        		if (req.decoded.rol.permisos[i] === urlPath) {
        			
            		tienePermiso = true;
        		}
        	}

    		if(tienePermiso)
	        	next();
	        else
	        	return res.json({ success: false, mensaje: 'Usted no tiene permiso de acceso.' });    
	      }
    });
  	}else{
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No se proporciono el token.' 
	    });
  	}
});



app.listen(3000, function () {
	console.log('App ready!');
});