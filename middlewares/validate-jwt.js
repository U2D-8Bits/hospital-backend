const jwt = require('jsonwebtoken');
const { response} = require('express');
const User = require('../models/user-module')

const validateJWT = (req, res = response, next) => {

    //* Leer el token
    const token = req.header('x-token');

    if( !token ){

        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })

    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();
        
    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });

    }

}


const validateAdminRole = async (req, res = response, next) =>{

    const uid = req.uid;

    try {
        
        const userDb = await User.findById(uid);

        if( !userDb ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if( userDb.str_role_user !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const validateAdminRole_or_MySelf = async (req, res = response, next) =>{

    const uid = req.uid;
    const id = req.params.id;

    try {
        
        const userDb = await User.findById(uid);

        if( !userDb ){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if( userDb.str_role_user !== 'ADMIN_ROLE' && uid !== id ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRole_or_MySelf
}