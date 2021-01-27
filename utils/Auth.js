// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const key = require("../config/key").secret;
// //const secret = require("../config/index").SECRET;
// /**
//  * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
//  */

// const userRegister = async (userData, role, res) => {
//   try {
//     // Validate the username
//     let usernameTaken = await validateUsernmae(userData.username);
//     if (!usernameTaken) {
//       res.status(400).json({
//         message: "Username already exist",
//         success: false,
//       });
//     }
//     // Validate the email
//     let emailRegistered = await validateEmail(userData.email);
//     if (!emailRegistered) {
//       res.status(400).json({
//         message: "Email already exist",
//         success: false,
//       });
//     }
//     const newUser = new User({
//       ...userData,
//       password: userData.password,
//       role,
//     });
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) throw err;
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save();
//         return res.status(201).json({
//           message: "New User created",
//           success: true,
//         });
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Unable to create your account",
//       success: false,
//     });
//   }
// };

// const userLogin = async (userCredentials, role, res) => {
//   let { username, password } = userCredentials;
//   // Check for user in the database
//   const user = await User.findOne({ username, role });
//   if (!user) {
//     return res.status(404).json({
//       message: "Username not found",
//       success: false,
//     });
//   }
//   // Check if the user role matches
//   if (user.role !== role) {
//     return res.status(406).json({
//       message: "Unauthorized",
//       success: false,
//     });
//   }
//   let isMatch = await bcrypt.compare(password, user.password);
//   if (isMatch) {
//     // Sign in the token and issue it to the user
//     const payload = {
//       user_id: user._id,
//       role: role.role,
//       username: user.username,
//       email: user.email,
//     };
//     jwt.sign(payload, key, { expiresIn: "60 minutes" }, (err, token) => {
//       if (err) throw err;
//       res.status(200).json({
//         success: true,
//         token: `Bearer ${token}`,
//       });
//     });
//   } else {
//     return res.status(406).json({
//       message: "Incorrect password",
//       success: false,
//     });
//   }
// };

// const validateUsernmae = async (username) => {
//   let user = await User.findOne({ username });
//   return user ? false : true;
// };

// const validateEmail = async (email) => {
//   let user = await User.findOne({ email });
//   return user ? false : true;
// };
// //Check Role Base Middleware
// const checkRole = (roles) => (req, res, next) => {
//   if (roles.includes(req.user.role)) {
//     return next();
//   } else {
//     return res.status(406).json({
//       message: "Unauthorized",
//       success: false,
//     });
//   }
// };
// // Passport middleware
// const userAuth = passport.authenticate("jwt", { session: false });
// // Serialized user details and block password from returning
// const serializeUser = (user) => {
//   return {
//     username: user.username,
//     email: user.email,
//     name: user.name,
//     _id: user._id,
//   };
// };
// module.exports = {
//   checkRole,
//   serializeUser,
//   userAuth,
//   register: userRegister,
//   login: userLogin,
// };
