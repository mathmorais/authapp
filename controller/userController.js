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
  update: async (req, res) => {
    for (let key in req.body) {
      if (req.body[key] == "") {
        const { [key]: keyValue, ...rest } = req.body;
        req.body = rest;
      }
    }

    await UserModel.findOneAndUpdate(
      req.body.id,
      { $set: req.body },
      { upsert: true },
      (err) => {
        err ? res.send("NOT_FOUND") : res.send("UPDATED");
      }
    );
  },
};
