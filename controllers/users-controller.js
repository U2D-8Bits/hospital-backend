const getUsers = async (req, res) => {
  res.json({
    ok: true,
    usuarios:[]
  });
};

module.exports = {
    getUsers,
}
