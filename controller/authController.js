const UserModel = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      return res.send("REJECT");
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

    const token = jwt.sign({ _id: receivedEmail._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    bcrypt
      .compare(user.password, receivedEmail.password)
      .then((result) => {
        if (result) {
          res.send({ token: token, message: "OK" });
        } else {
          res.send("REJECTED");
        }
      })
      .catch((err) => console.log(err));
  },
};
