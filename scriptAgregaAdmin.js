conn = new Mongo("localhost");

db = conn.getDB("apiiiii");

admin = {
    usuario : "admin",
    contrasena : "admin",
    rol : {
            "nombre" : "admin",
            "permisos" : [ 
                '/insertarTag',
                '/borrarTag',
                '/insertarDocumento',
                '/listarDocumentos',
                '/actualizaDocumento',
                '/transferirDocumento',
                '/transferirDocumentoAdmin',
                '/borrarDocumento',
                '/borrarDocumentoAdmin',
                '/insertarRol',
                '/listarRol',
                '/modificarRol',
                '/asignarRol',
                '/borrarRol',
                '/insertarUsuario',
                '/listarUsuarios',
                '/modificarUsuario',
                '/borrarUsuario',
            ]
        }
};

db.usuario.insert(admin);