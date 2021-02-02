const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    priviledges: ["admin", "user"],
  },
  password: {
    type: String,
    require: true,
  },
  accessToken: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User = mongoose.model("user", UserSchema);
