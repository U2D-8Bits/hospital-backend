const User = require('../models/user-module');

const getUsers = async (req, res) => {
  res.json({
    ok: true,
    usuarios:[]
  });
};

const createUser = async (req, res) => {

    const { str_name_user, str_email_user, str_password_user } = req.body;

    const user = new User( req.body );

    await user.save();

    res.json({
        ok: true,
        user
    });
}

module.exports = {
    getUsers,
    createUser
}
