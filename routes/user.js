const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const User = require("../models/User");

// router.get("/:role", (req, res) => {
//   User.findOne({ role: req.params.role }).then((user) => {
//     if (user.role == "admin") {
//       res.json(user);
//     } else {
//       res.status(403).json({ msg: "Unauthorized" });
//     }
//   });
// });
router.get("/dashboard/:role", (req, res) => {
  User.findOne({ role: req.params.role }).then((user) => {
    if (user.role == "admin") {
      //   res.json({ msg: "Welcome to Admin Dashboard" });
      res.redirect("/admin-dashboard");
    }
    if (user.role == "user") {
      res.json({ msg: "Welcome to User Dashboard" });
    }
    if (user.role === undefined) {
      res.json({ msg: "Permission denied" });
    }
  });
});
router.post("/signup", (req, res) => {
  const { name, email, role, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ msg: "Email already exist" });
      } else {
        const newUser = new User({
          name,
          email,
          role,
          password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            jwt.sign({ role: newUser.role }, secret, (err, token) => {
              if (err) throw err;
              newUser.save((err, user) => {
                if (err) throw err;
                res.json({
                  msg: "Success!",
                  token: `Bearer ${token}`,
                  user,
                });
              });
            });
          });
        });
      }
    })
    .catch((err) => {
      res.json({ msg: err });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: "Email does not exist" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
          jwt.sign(payload, secret, { expiresIn: "60s" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
            });
          });
        } else {
          res.status(400).json({ msg: "Incorrect password" });
        }
      });
    }
  });
});
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bycrypt = require("bcryptjs");
// const User = require("../models/User");
// const {
//   register,
//   login,
//   userAuth,
//   checkRole,
//   serializeUser,
// } = require("../utils/Auth");

// router.get("/landing-page", (req, res) => {
//   res.json({ message: "Welcome to Landing Page" });
// });

// router.get("/", userAuth, checkRole, (req, res) => {
//   User.findOne({ role });
//   if (role) {
//     console.log(role, "user role");
//   } else {
//     console.log("No role");
//   }
// });

// // Users Registration Route
// // router.post("/register-user", async (req, res) => {
// //   await register(req.body, "user", res);
// // });
// // // Admin Registration Route
// // router.post("/register-admin", async (req, res) => {
// //   await register(req.body, "admin", res);
// // });
// // Super Admin Registration Route
// router.post("/register-super-admin", async (req, res) => {
//   await register(req.body, "super-admin", res);
// });

// // Users Login Route
// router.post("/login-user", async (req, res) => {
//   await login(req.body, "user", res).then((status) =>
//     res.redirect(status, "/")
//   );
// });
// //Admin Login Route
// router.post("/login-admin", async (req, res) => {
//   await login(req.body, "admin", res);
// });
// // // Super Admin Login Route
// router.post("/login-super-admin", async (req, res) => {
//   await login(req.body, "super-admin", res);
// });

// // Protected Routes
// router.get(
//   "/user-protected",
//   userAuth,
//   checkRole(["user"]),
//   async (req, res) => {
//     res.json({ message: "Hello User" });
//   }
// );
// router.get(
//   "/admin-protected",
//   userAuth,
//   checkRole(["admin"]),
//   async (req, res) => {
//     res.json({ message: "Hello Admin" });
//   }
// );
// router.get(
//   "/super-admin-protected",
//   userAuth,
//   checkRole(["super-admin"]),
//   async (req, res) => {
//     res.json({ message: "Hello Super Admin" });
//   }
// );
// // router.get(
// //   "/super-admin-and-admin-protected",
// //   userAuth,
// //   checkRole(["superadmin", "admin"]),
// //   async (req, res) => {}
// // );

// // Profile Route
// router.get("/profile", (req, res) => {});
// // Users Protected Route
// router.post("/profile-user", async (req, res) => {});
// // Admin Protected Route
// router.post("/profile-admin", async (req, res) => {});
// // Super Admin Protected Route
// router.post("/profile-super-admin", async (req, res) => {});

// module.exports = router;
