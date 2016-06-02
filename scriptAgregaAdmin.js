conn = new Mongo("localhost");

db = conn.getDB("apiiiii");

/*
usuario{
	usuario
	contrasena
	rol
	}
*/
admin = {
    usuario : "admin",
    contrasena : "admin",
    rol : {
            "nombre" : "admin",
            "permisos" : [ 
                "/insertarDocumento", 
                "/insertarTag", 
                "/borrarTag", 
                "/listarDocumentos", 
                "/compartirDocumento", 
                "/borrarDocumento", 
                "/modificarDocumento", 
                "/insertarRol", 
                "/modificarRol", 
                "/borrarRol", 
                "/listarRol", 
                "/asignarRol", 
                "/insertarUsuario", 
                "/modificarUsuario", 
                "/borrarUsuario", 
                "/listarUsuarios"
            ]
        }
}

db.usuario.insert(admin);