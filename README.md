Objetos JSON que tolera cada url.

	'/registro':
	{
		"usuario" : "user",
		"contrasena" : "pass"
	}


	'/autenticacion':
	{
		"usuario" : "user",
		"contrasena" : "pass"
	}

	'/api/insertarTag':
	{
		"_id" : "idDocumento",
		"tags" : [string] ó string
	}

	'/api/borrarTag':
	{
		"_id" : "idDocumento",
		"tags" : "nombreTag"
	}

	'/api/insertarDocumento':
	{
		"caratula" : "title",
		"titulo" : "teme",
		"tags" : "string" ó [string],
		"archivo" : "archivo en base 64"		
	}

	'/api/listarDocumentos':
	{} ó filtrando por alguno de los sgtes. parámetros:
	{
		"caratula" : "title",
		"titulo" : "teme",
		"tags" : "string" ó [string],
		"dueno" : "id-user",
		"archivo" : "archivo en base 64"
	}

	'/api/actualizaDocumento':
	{
		"idDocumento" : "id-doc",
		"caratula" : "title",
		"titulo" : "teme",
		"tags" : "string" ó [string],
		"dueno" : "idUsuario",
		"archivo" : "archivo en base 64"
	}

	'/api/transferirDocumento':
	{
		"idDocumento" : "id-doc",
		"idUsuario" : "id-user"
	}

	'/api/transferirDocumentoAdmin':
	{
		"idDocumento" : "id-doc",
		"idUsuario" : "id-user"
	}

	'/api/borrarDocumento':
	{
		"_id" : "id-doc"
	}

	'/api/borrarDocumentoAdmin'´:
	{
		"_id" : "id-doc"
	}

	'/api/insertarRol':
	{
		"nombre" : "name-rol",
		"permisos" : ["url1", "url2"...]
	}

	'/api/listarRol':
	{}

	'/api/modificarRol':
	{
		"_id" : "id-rol",
		"nombre" : "name-rol",
		"permisos" : ["url1", "url2"...]
	}

	'/api/asignarRol':
	{
		"u_id" : "id-user",
		"r_id" : "id-rol"
	}

	'/api/borrarRol':
	{
		"_id" : "id-rol"
	}

	'/api/insertarUsuario':
	{
		"usuario" : "name-user",
		"contrasena" : "pass-user",
		"rol" : {
			ObjectId: "id-rol",
			"nombre" : "name-rol",
			"permisos" : ["url1", "url2"...]
		}
	}

	'/api/listarUsuarios':
	{}

	'/api/modificarUsuario':
	{
		"_id" : "id-user",
		"usuario" : "name-user",
		"contrasena" : "pass-user",
		"rol" : {
			ObjectId: "id-rol",
			"nombre" : "name-rol",
			"permisos" : ["url1", "url2"...]
		}
	}

	'/api/borrarUsuario':
	{
		"_id" : "id-user"
	}