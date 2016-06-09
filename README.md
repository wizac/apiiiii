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
		
	}