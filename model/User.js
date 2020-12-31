const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    file: {
      dataB64: { type: String },
      url: { type: String },
    },
    bio: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
