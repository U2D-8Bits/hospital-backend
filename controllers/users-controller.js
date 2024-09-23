const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-module");


//? -----------------------------------------------------
//? Controlador para obtener todos los usuarios
//? -----------------------------------------------------
const getUsers = async (req, res) => {
  const users = await User.find(
    {},
    "str_name_user str_email_user str_role_user bln_google_user"
  );

  res.json({
    ok: true,
    users,
  });
};


//? -----------------------------------------------------
//? Controlador para crear un nuevo usuario
//? -----------------------------------------------------
const createUser = async (req, res = response) => {
  const { str_name_user, str_email_user, str_password_user } = req.body;

  try {
    const existEmail = await User.findOne({ str_email_user });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: `El correo ${str_email_user} ya está registrado`,
      });
    }

    const user = new User(req.body);

    //* Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.str_password_user = bcrypt.hashSync(str_password_user, salt);

    //* Guardar usuario
    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};


//? -----------------------------------------------------
//? Controlador por actualizar un usuario
//? -----------------------------------------------------

const updateUser = async ( req, res = response) => {

  const uid = req.params.id;


  try {

    const existUser = await User.findById(uid);

    if( !existUser ){

      return res.status(404).json({
        ok: false,
        msg: 'El usuario con el id proporcionado no existe'
      });
    }

    const fields = req.body;

    if( existUser.str_email_user === req.bosy.str_email_user ){

      delete fields.str_email_user

    }else{

      const existEmail = User.findOne({ str_email_user: req.body.str_email_user })

      if( existEmail ){

        return res.status(400).json({
          ok: false,
          msg: `El correo electrónico ${ existEmail } ya existe en la base de datos!`
        });

      }

    }


    delete fields.str_password_user;
    delete fields.bln_google_user;

    const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true });

    return res.status(200).json({
      ok: true,
      userUpdated
    })


  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    })
  }


};

module.exports = {
  getUsers,
  createUser,
  updateUser,
};
