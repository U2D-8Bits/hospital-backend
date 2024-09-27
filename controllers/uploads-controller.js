const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updateFile } = require('../helpers/update-file');


//? -------------------------------------------------
//? Controlador para subir archivos
//? -------------------------------------------------
const uploadFile = async (req, res = response) => {

    const collection = req.params.collection;
    const uid = req.params.id;

    const validCollections = ['users', 'doctors', 'hospitals'];
    if( !validCollections.includes(collection) ){
        return res.status(400).json({
            ok: false,
            msg: 'Colección no válida'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'No hubo archivos para subir.'
        });
    }

    const file = req.files.image;

    const nameCuted = file.name.split('.');
    const extension = nameCuted[ nameCuted.length -1 ];

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtensions.includes(extension) ){
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no válida'
        });
    }

    const nameFile = `${ uuidv4() }.${extension}`;

    const path = `./uploads/${collection}/${nameFile}`;

    file.mv(path, function(err) {
        if (err){
            return res.status(500).send({
                ok: false,
                msg: 'Error al mover el archivo'    
            });
        }

        updateFile( collection, uid, nameFile);
    
        return res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nameFile
        });
    });
}

//? -------------------------------------------------
//? Controlador para mostrar archivos
//? -------------------------------------------------

const getFile = async (req, res = response) => {

    const collection = req.params.collection;
    const file = req.params.file;

    const pathFile  = path.join( __dirname, `../uploads/${collection}/${file}` ); 

    if( fs.existsSync(pathFile) ){
        res.sendFile(pathFile);
    }else{
        const pathFile = path.join( __dirname, `../uploads/no-image.png` );
        res.sendFile(pathFile);
    }

}

module.exports = {
    uploadFile,
    getFile
}