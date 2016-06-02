
//Insertar documentos
/*
documentos{

	caratula
	titulo	
	tags[]
	dueno(id dueño)
	archivo (archivo en base64)
	}
    
    mientras manden un json con esos parametro anda
*/
function documentoPut(db) {
    return function (req, res) {
        var dbDocumento = db.get("documentos");
        var completo = true;
        var falta = {};
        var documento = {};
        if("caratula" in req.body){
            documento.caratula = req.body.caratula;
            falta.caratula = true;
        }else{
            completo = false;
            falta.caratula = false;
        }
        
        if("titulo" in req.body){
            documento.titulo = req.body.titulo;
            falta.titulo = true;	
        }else{
            completo = false;
            falta.titulo = false;
        }
        
        if("tags" in req.body){
            documento.tags = req.body.tags;
            falta.tags = true;	
        }else{
            completo = false;
            falta.tags = false;
        }
        
        if("archivo" in req.body){
            documento.archivo = req.body.archivo;
            falta.archivo = true;	
        }else{
            completo = false;
            falta.archivo = false;
        }
        
        if(completo){
            documento.dueno = req.decoded.id;
            dbDocumento.insert(documento,function(err, doc){
                if(err){                  
                        throw err;
                }else{
                    
                    res.json({
                        success : true,
                        message : "Se agrego a la base correctamente",
                        documento : doc
                    });
                }
                
            });
        }else{
            res.json({
                success : false,
                message : "Faltan campos",
                faltan : falta
            })
        }   
    }
}

//insertar usuarios
/*
usuario{
	nombre
	usuario
	contrasena
	rol
	}
*/
function usuarioPut(db){
    return function(req, res){
        var dbUsuario = db.get("usuario");
        var completo = true;
        var usuario = {};
        var falta = {};
        
        if("usuario" in req.body){
            usuario.usuario = req.body.usuario;
            falta.usuario = true;
        }else{
            completo = false;
            falta.usuario = false;
        }
        
        if("contrasena" in req.body){
            usuario.contrasena = req.body.contrasena;
            falta.contrasena = true;
        }else{
            completo = false;
            falta.contrasena = false;
        }
        
        if("rol" in req.body){
            usuario.rol = req.body.rol;
            falta.rol = true;
        }else{
            completo = false;
            falta.rol = false;
        }
        
        if(completo){
            //entra si el json esta completo
            //compruebo si el usuario ya existe
            dbUsuario.find({usuario : usuario.usuario}, function(err, docs){
                if(err){
                    throw err;
                }else{//controlamos si la longitud de la busqueda es 0 
                    if(docs.length == 0){
                        dbUsuario.insert(usuario, function(err, doc){
                            if(err){
                                throw err;
                            }else{
                                res.json({
                                    success : true,
                                    message : "Se registro correctamente",
                                    usuario : doc
                                });
                            }
                        });
                    }else{
                        res.json({
                            success : false,
                            message : "Ya hay un usuario con ese nombre de usuario"                            
                        });
                    }
                }
            });
        }else{//entra si faltan campo
             res.json({
                success : false,
                message : "Faltan datos",
                faltan : falta                 
            });
        }
    }
}

function  usuarioDelete(db) {
    return function(req, res) {
        
        dbUsuario = db.get("usuario");
        
        if("_id" in req.body){
            dbUsuario.remove({_id : req.body._id}, function(err){
               if(err){
                   throw err;
               }else{
                   res.json({
                       success : true,
                       message : "Se elimino correctamente"
                   })
               } 
            });
        }else{
            res.json({
               success : false,
               message : "Falata el _id" 
            });
        }
    }
}

/*
rol{
	nombre
	permisos[]
	}
*/

function estructuraRol(){
    
}

exports.documentoPut = documentoPut;
exports.usuarioPut = usuarioPut;
exports.usuarioDelete = usuarioDelete;
