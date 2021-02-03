const express = require("express");
const router = express.Router();
const multer = require("multer");
const Profile = require("../models/Profiles");
const helpers = require("./helpers");
const fileUpload = multer({ dest: "uploads/" });
const fs = require("fs");
const { send } = require("process");
const loggedIn = require("../middlewares/checkIfLoggedIn");

const uploadDisk = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".jpg" || ".png")) {
      cb(new Error("Please upload a jpg or png file"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/profile",
  uploadDisk.single("profileImage"),
  (req, res) => {
    const { email } = req.body;
    const profileImage = req.body.profileImage;
    console.log(profileImage, "img");
    Profile.findOne({ email }).then((email) => {
      if (email) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        const data = new Profile({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          dateOfBirth: req.body.dateOfBirth,
          stateOfOrigin: req.body.stateOfOrigin,
          contactAddress: req.body.contactAddress,
          phone: req.body.phone,
          nextOfKin: req.body.nextOfKin,
          nextOfKinAddress: req.body.nextOfKinAddress,
          nextOfKinPhone: req.body.nextOfKinPhone,
          profileImage: profileImage,
          institution: req.body.institution,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          certificateAcquired: req.body.certificateAcquired,
          uploadCertificate: req.body.uploadCertificate,
          workExperience: req.body.workExperience,
          otherSkills: req.body.otherSkills,
        });

        data.save().then((data) => {
          res.json({ message: "Profile successfuly created", data });
        });
      }
    });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Get all profiles
router.get("/profiles", async (req, res, next) => {
  try {
    await Profile.find({}).then((profile) => {
      if (!profile) req.status(404).json({ msg: "Something went wrong" });
      res.status(200).json({ profile });
      next();
    });
  } catch (error) {
    next(error);
  }
});
// Get profile image by ID
router.get("/profile/:id/image", (req, res) => {
  try {
    const id = req.params.id;
    Profile.findById(id).then((user) => {
      if (!user) {
        throw new Error("User not found");
      } else {
        res.set("Content-Type", "image/jpg");
        res.send(user.profileImage);
      }
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// Get profile data by ID

router.get("/profile/:id", loggedIn, (req, res) => {
  try {
    const id = req.params.id;
    Profile.findById(id).then((user) => {
      if (!user) {
        throw new Error("User not found");
      } else {
        res.set("Content-Type", "application/json");
        res.json({
          firstName: user.firstName,
          lastName: user.lastName,
          institution: user.institution,
          experience: user.workExperience,
          skills: user.otherSkills,
          email: user.email,
          stateOfOrigin: user.stateOfOrigin,
          contactAddress: user.contactAddress,
          phone: user.phone,
          nextOfKin: user.nextOfKin,
          nextOfKinAddress: user.nextOfKinAddress,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});
// Edit Profile or Update Profile
router.post("/profile/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    await Profile.findByIdAndUpdate(id, { firstName, lastName }).then(
      (profile) => {
        !profile
          ? "Error updating your profile"
          : res.status(200).json({ msg: "Profile successfully updated" });
      }
    );
  } catch (error) {
    next(error);
  }
});

// Delete Profile
router.delete("/profile/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Profile.findByIdAndDelete(id).then((profile) => {
      !profile
        ? "Error deleting your profile"
        : res.status(200).json({ msg: "Profile successfully deleted" });
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
