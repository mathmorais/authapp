const UserModel = require("../model/User");

module.exports = {
  get: async (req, res) => {
    const id = req.params.id;

    try {
      const findedUser = await UserModel.findById(id);
      res.send(findedUser);
    } catch (err) {
      res.send("NULL");
    }
  },
};
