const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-module");
const { generateToken } = require("../helpers/jwt-helper");
//? -----------------------------------------------------
//? Controlador para iniciar sesión (Login)
//? -----------------------------------------------------

const login = async (req, res = response) => {
  const { str_email_user, str_password_user } = req.body;

  try {

    const userDB = await User.findOne({ str_email_user });

    if( !userDB ){

        return res.status(404).json({
            ok: false,
            msg: "Correo o contraseña incorrectos"
        });

    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync( str_password_user, userDB.str_password_user );

    if( !validPassword ){
        return res.status(400).json({
            ok: false,
            msg: "Correo o contraseña incorrectos"
        });
    }

    // Generar el token - JWT
    const token = await generateToken( userDB.id );

    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);

    return (
      res.status(500),
      json({
        ok: false,
        msg: "Error inesperado... revisar logs",
      })
    );
  }
};



//? -----------------------------------------------------
//? Controlador para iniciar sesión con Google
//? -----------------------------------------------------

const googleSignIn = async (req, res = response) => {
  
  const token = req.body.token;

  return res.status(200).json({
    ok: true,
    token,
  });

}

module.exports = {
  login,
  googleSignIn
};
