function insertar(db) {
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
        
        if("dueno" in req.body){
            documento.dueno = req.body.dueno;
            falta.dueno = true;
        }else{
            completo = false,
            falta.dueno = false
        }
                
        if(completo){
            dbDocumento.insert(documento,function(err, doc){
                if(err){
                    res.json({
                        success : false,
                        message : "Error al agregarlo a la base",
                        error : err
                    })
                }else{
                    res.json({
                        success : true,
                        message : "Se agrego a la base correctamente",
                        documento : doc
                    })
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
