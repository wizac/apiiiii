var db = require('monk')('localhost/apiiiii');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var registro = require('registro');

//var tag=require('./TagManager.js');
var autenticacion = require('./login.js');


app.use(bodyParser.json());

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

//-----------------------------------------------------------

app.post('/api/insertarDocumento', function(){});

app.get('/api/insertarTag', function(){});

app.get('/api/listarDocumentos', function(){});

app.post('/autenticacion', autenticacion.login(db));

app.post('/registro', function(){});

app.get('/api/compartirDocumento', function(){});

app.get('/api/borrarDocumento', registro(db));

app.post('/api/modificarDocumento', function(){});

app.post('/api/insertarRol', function(){});

app.post('/api/modificarRol', function(){});

app.post('/api/borrarRol', function(){});

app.get('/api/listarRoles', function(){});

app.post('/api/insertarUsuario', function(){});

app.post('/api/modificarUsuario', function(){});

app.get('/api/borrarUsuario', function(){});

app.get('/api/listarUsuarios', function(){});

/*app.get('/', function(req, res){
	console.log(req);
});*/

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

	        for (var i = 0; i < req.decoded.rol.permisos.length; i++){
        		if (req.decoded.rol.permisos.length[i] === req.url) {
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