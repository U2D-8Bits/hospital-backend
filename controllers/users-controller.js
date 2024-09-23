const User = require('../models/user-module');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'str_name_user str_email_user str_role_user bln_google_user');
    

  res.json({
    ok: true,
    users
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
