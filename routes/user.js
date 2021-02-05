const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const User = require("../models/User");
const { body, check, validationResult } = require("express-validator");
const { checkSchema } = require("express-validator");
const auth = require("../middlewares/authentication");
const validator = require("validator");
const loggedIn = require("../middlewares/checkIfLoggedIn");
const permission = require("../middlewares/grantAccess");

router.get("/", (req, res) => {
  res.redirect("/login");
});

// REGISTER ROUT
router.post(
  "/signup",
  [
    check("name", "Name too short").isLength({ min: 7 }),
    check("name", "Name cannot be empty").notEmpty(),
    check("email", "Must be a valid  email").isEmail(),
    check("email", "Email cannot be empty").notEmpty(),
    check("role", "Role cannot be empty").notEmpty(),
    check("password", "Password must be at least 7 character long").isLength({
      min: 7,
    }),
    check("password", "Password cannot be empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, email, role, password } = req.body;
      User.findOne({ email }).then((user) => {
        if (user) {
          res.status(400).json({ msg: "Email already exist" });
        } else {
          const newUser = new User({
            name,
            email,
            role: role || "admin",
            password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              const accessToken = jwt.sign({ userId: newUser._id }, secret, {
                expiresIn: "1d",
              });
              newUser.accessToken = accessToken;
              newUser.save();
              res.json({
                data: newUser,
                accessToken,
              });
            });
          });
        }
      });
      // .catch((err) => {
      //   res.json({ msg: err });
      // });
    } else if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map((err) => {
          return err.msg;
        })
      );
    }
  }
);

// LOGIN ROUTE
// router.post(
//   "/login",
//   [
//     check("email", "Must be a valid  email").isEmail(),
//     check("email", "Email cannot be empty").notEmpty(),
//     check("password", "Password must be at least 7 character long").isLength({
//       min: 7,
//     }),
//     check("password", "Password cannot be empty").notEmpty(),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       const { email, password } = req.body;
//       User.findOne({ email }).then((user) => {
//         if (!user) {
//           res.status(400).json({ msg: "Email does not exist" });
//         } else {
//           bcrypt.compare(password, user.password).then((isMatch) => {
//             if (isMatch) {
//               const payload = {
//                 id: user._id,
//                 // name: user.name,
//                 // email: user.email,
//                 // role: user.role,
//               };
//               jwt.sign(
//                 payload,
//                 secret,
//                 { expiresIn: "1 day" },
//                 (err, token) => {
//                   if (err) throw err;
//                   res.status(200).json({
//                     success: true,
//                     token: `Bearer ${token}`,
//                   });
//                 }
//               );
//             } else {
//               res.status(400).json({ msg: "Incorrect password" });
//             }
//           });
//         }
//       });
//     } else if (!errors.isEmpty()) {
//       return res.status(400).json(
//         errors.array().map((err) => {
//           return err.msg;
//         })
//       );
//     }
//     {
//     }
//   }
// );

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }).then((user) => {
      if (!user) res.status(400).json({ msg: "Email not found" });
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) res.status(400).json({ msg: "Incorrect password" });
        const accessToken = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "1 day",
        });
        User.findByIdAndUpdate(user._id, { accessToken });
        res
          .status(200)
          .json({ email: user.email, role: user.role, accessToken });
      });
    });
  } catch (error) {
    next(error);
  }
});

// GET USER BY ID
router.get("/user/:id", loggedIn, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    if (!user) {
      res.status(401).json({ error: "Could not fetch user" });
    } else {
      res.status(200).json(user);
    }
  });
});

router.get("/user", permission.grantAccess, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    if (!user) {
      res.status(401).json({ error: "Could not fetch user" });
    } else {
      res.status(200).json(user);
    }
  });
});
module.exports = router;
