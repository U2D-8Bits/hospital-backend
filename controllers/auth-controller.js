const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-module");
const { generateToken } = require("../helpers/jwt-helper");
const { googleVerify } = require("../helpers/google-helper");
const { getMenuFrontEnd } = require("../helpers/menu-helper");
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
      menu:getMenuFrontEnd(userDB.str_role_user)
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
  
  
  try {
    const { email, family_name, given_name, picture } = await googleVerify( req.body.token );

    const userDB = await User.findOne({ str_email_user: email });
    let user;

    if( !userDB ){
      user = new User({
        str_email_user: email,
        str_name_user: given_name + " " + family_name,
        str_password_user: "@@@",
        str_img_user: picture,
        bln_google_user: true
      })
    }else{
      user = userDB;
      user.bln_google_user = true;
    }

    // Guardar en BD
    await user.save();

    // Generar el token - JWT
    const token = await generateToken( user.id );
    
    return res.status(200).json({
      ok: true,
      token,
      user,
      menu:getMenuFrontEnd(user.str_role_user)
    });

  } catch (error) {
    
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token de Google no válido",
    });

  }
}


//? -----------------------------------------------------
//? Controlador para renovar el token
//? -----------------------------------------------------

const renewToken = async(req, res = response) => {

  const uid = req.uid;

  // Generar un nuevo JWT
  const token = await generateToken( uid );

  //Obtener el usuario por uid

  const userDb = await User.findById( uid );

  return res.status(200).json({
    ok: true,
    token,
    user: userDb,
    menu:getMenuFrontEnd(userDb.str_role_user)
  })

}



module.exports = {
  login,
  googleSignIn,
  renewToken
};
