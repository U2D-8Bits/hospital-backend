const { response } = require("express");
const User = require("../models/user-module");

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

const createUser = async (req, res = response) => {
  try {

    const { str_name_user, str_email_user, str_password_user } = req.body;

    const existEmail = await User.findOne({ str_email_user });

    if( existEmail ){
        return res.status(400).json({
            ok: false,
            msg: `El correo ${str_email_user} ya está registrado`
        });
    }

    const user = new User(req.body);

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

module.exports = {
  getUsers,
  createUser,
};
