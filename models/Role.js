const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
  role: {
    type: String,
    role: ["admin", "headofschool", "schooladmin", "account", "teacher"],
    default: "admin",
  },
});
const Role = mongoose.model("role", RoleSchema);
module.exports = Role;
