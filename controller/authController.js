const UserModel = require("../model/User");
const bcrypt = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const emailSent = req.body.email;

    const receivedEmail = await UserModel.findOne({ email: emailSent });

    if (receivedEmail) {
      return res.send("EMAIL ALREADY EXIST");
    }

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    try {
      await user.save();
      return res.send("USER CREATED");
    } catch (err) {
      return res.send(err);
    }
  },
  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const emailSent = user.email;

    const receivedEmail = await UserModel.findOne({ email: emailSent });

    if (!receivedEmail) {
      return res.send("REJECTED");
    }

    bcrypt.compare(user.password, receivedEmail.password).then((result) => {
      if (result) {
        res.send("OK");
      } else {
        res.send("REJECTED");
      }
    });
  },
};
