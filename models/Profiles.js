const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  datefBirth: { type: String },
  stateOfOrigin: { type: String },
  contactAddress: { type: String },
  phone: { type: Number },
  nextOfKin: { type: String },
  nextOfKinAddress: { type: String },
  nextOfKinPhone: { type: Number },
  profileImage: { type: Buffer },

  institution: [],
  startDate: { type: String },
  endDate: { type: String },
  certificateAcquired: { type: String },
  // uploadCertificate: { type: Buffer },

  workExperience: [],
  otherSkills: [],
});
const profile = mongoose.model("profile", ProfileSchema);
module.exports = profile;
