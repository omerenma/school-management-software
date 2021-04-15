const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/keys_dev").secretOrKey;
const refreshTokenSecret = require("../config/keys_dev").refreshTokenSecrete;
const { body, check, validationResult } = require("express-validator");
const { checkSchema } = require("express-validator");
const auth = require("../middlewares/authentication");
const validator = require("validator");
const loggedIn = require("../middlewares/checkIfLoggedIn");
const permission = require("../middlewares/grantAccess");
const db = require("../dbconfig").pool;
const jwtAuthenticate = require("../utils/Auth");
const authenticate = require("../utils/Auth");
const role = require("../utils/checkRolePermission");
// Db connection

const refreshTokens = [];

router.post("/signup", (req, res) => {
  const { name, email, username, password, role_id } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      req.body.password = hash;
      const text =
        "INSERT INTO users(name, email, username, password, role_id) VALUES($1, $2, $3, $4, $5)";
      const values = [name, email, username, hash, role_id];
      db.query(text, values, (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(result);
        }
      });
    });
  });
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const pages = await db.query("SELECT * FROM pages");
  rows.map((data) => {
    if (data.email == email) {
      bcrypt.compare(password, data.password).then((isMatch) => {
        if (!isMatch) {
          res.status(400).json({ message: "Email or Password not found" });
        } else {
          const payload = {
            role: data.role_id,
            name: data.name,
            email: data.email,
          };

          const access_token = jwt.sign(payload, secret, {
            expiresIn: "120s",
          });
          const refresh_token = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: "1 day",
          });

          refreshTokens.push(refresh_token);

          res.json({
            access_token: `${access_token}`,
            refresh_token: `${refresh_token}`,
            role: data.role_id,
          });
        }
      });
    } else {
      res.json("Wrong email or password");
    }
  });
});

router.get("/users", authenticate, role, (req, res) => {
  // const token = req.headers["authorization"];
  // const decoded = jwt_decode(token);
  // if (decoded.role !== 1) {
  //   res.json({ message: "Unauthorized to view this resource" });
  // }
  // role();
  db.query("SELECT * FROM users").then((user) => {
    res.json(user.rows);
  });
});
router.get("/dashboard", authenticate, (req, res) => {
  res.json("Welcome to  Dashboard");
});

// Token route
router.post("/token", (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token || !refreshTokens.includes(refresh_token)) {
    res.json(401).json({ msg: "Not authenticated" });
  }
  jwt.verify(refresh_token, refreshTokenSecret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "User not authenticated" });
    } else {
      const access_token = jwt.sign(
        { name: payload.name, email: payload.email, role: payload.role },
        secret,
        {
          expiresIn: "1 minute",
        }
      );
      return res.status(201).json({ access_token });
    }
  });
});

// Logout route
router.post("/logout", (req, res) => {
  refreshTokens.pop();
  res.json({
    msg: "Logged out!",
  });
});

module.exports = router;
