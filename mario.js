
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
            });
        }   
    };
}

//insertar usuarios
/*
usuario{
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
            falta.rol = {};
            if(req.body.rol instanceof Object){
                usuario.rol = {};
                if("nombre" in req.body.rol){
                    usuario.rol.nombre = req.body.rol.nombre;
                    falta.rol.nombre = true;
                }
                else{
                    falta.rol.nombre = false;
                    completo = false;
                }
                if("permisos" in req.body.rol){
                    if(req.body.rol.permisos instanceof Array){
                        usuario.rol.permisos = req.body.rol.permisos;
                        falta.rol.permisos = true;
                    }
                    {
                        completo = false;
                        falta.rol.permisos = "false, Tiene que ser un arreglo";
                    }
                    
                    
                }
                else{
                    completo = false;
                    falta.rol.permisos = false;
                }
            }
            else{
                completo = false;
                falta.rol.nombre = false;
                falta.rol.permisos = false; 
            }
        }else{
            falta.rol = {};
            completo = false;
            falta.rol.nombre = false;
            falta.rol.permisos = "false, Tiene que ser un arreglo";
        }


        
        if(completo){
            //entra si el json esta completo
            //compruebo si el usuario ya existe
            dbUsuario.find({usuario : usuario.usuario}, function(err, docs){
                if(err){
                    throw err;
                }else{//controlamos si la longitud de la busqueda es 0 
                    if(docs.length === 0){
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
    };
}

function  usuarioDelete(db) {
    return function(req, res) {
        
        dbUsuario = db.get("usuario");
        
        if(!("_id" in req.body)){
            res.json({
               success : false,
               message : "Falata el _id" 
            });
            return;
        }
        
        dbUsuario.findOne({_id : req.body._id},function(err, doc){
            if(!doc){
                res.json({
                    success : false,
                    message : "No existe el usuario para eliminarlo"
                });
            }else{
                dbUsuario.remove({_id : req.body._id}, function(err){
                    if(err){
                        throw err;
                    }else{
                        res.json({
                            success : true,
                            message : "Se elimino correctamente"
                        });
                    } 
                });
            }
        });
    };
}

exports.documentoPut = documentoPut;
exports.usuarioPut = usuarioPut;
exports.usuarioDelete = usuarioDelete;
