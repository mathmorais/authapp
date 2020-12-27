const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, default: "Nothing here for now" },
  phone: { type: String, default: "123456789" },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

module.exports = mongoose.model("User", UserSchema);
