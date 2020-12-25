const UserModel = require("../model/User");

module.exports = {
  register: async (req, res) => {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const savedUser = await user.save();
      return res.send(savedUser);
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res) => {
    res.send("login");
  },
};
