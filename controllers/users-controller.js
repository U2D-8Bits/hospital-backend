const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-module");
const { generateToken } = require("../helpers/jwt-helper");

//? -----------------------------------------------------
//? Controlador para obtener todos los usuarios
//? -----------------------------------------------------
const getUsers = async (req, res) => {
  
  const since = Number(req.query.since) || 0;
  

  const [users, total] = await Promise.all([
    await User
    .find({},"str_name_user str_email_user str_role_user bln_google_user")
    .skip(since)
    .limit(10),
    await User.countDocuments()
  ]);


  try {

    res.json({
      ok: true,
      users,
      total
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    })  
  }
  
  
};

//? -----------------------------------------------------
//? Controlador para crear un nuevo usuario
//? -----------------------------------------------------
const createUser = async (req, res = response) => {
  const { str_email_user, str_password_user } = req.body;

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

    const token = await generateToken(user.id);

    res.json({
      ok: true,
      user,
      token,
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

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const existUser = await User.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario con el id proporcionado no existe",
      });
    }

    const { str_email_user, str_password_user, bln_google_user, ...fields } =
      req.body;

    if (existUser.str_email_user != str_email_user) {
      const existEmail = await User.findOne({
        str_email_user,
      });

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese correo",
        });
      }
    }

    fields.str_email_user = str_email_user;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      user: userUpdated,
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
//? Controlador de eliminación lógica de usuario
//? -----------------------------------------------------

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const existUser = await User.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        ok: false,
        msg: `El usuario con el id ${uid} no existe`,
      });
    }

    await User.findByIdAndDelete(uid);

    return res.status(200).json({
      ok: true,
      uid,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
