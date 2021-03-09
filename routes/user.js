const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secretOrKey;
const User = require("../models/User");
const { body, check, validationResult } = require("express-validator");
const { checkSchema } = require("express-validator");
const auth = require("../middlewares/authentication");
const validator = require("validator");
const loggedIn = require("../middlewares/checkIfLoggedIn");
const permission = require("../middlewares/grantAccess");
//const db = require("../config/db_connection");
const db = require("../dbconfig").pool;

// Db connection

router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (error, user) => {
    if (error) {
      throw error;
    } else {
      res.json(user.rows);
    }
  });
});
router.get("/dashboard", (req, res) => {
  res.json("Welcome to Updated Dashboard");
});

router.post("/signup", async (req, res) => {
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
  rows.map((data) => {
    if (data.email == email) {
      bcrypt.compare(password, data.password).then((isMatch) => {
        if (!isMatch) {
          res.status(400).json({ message: "Email not found" });
        } else {
          const payload = {
            role: data.role_id,
            name: data.name,
            email: data.email,
          };
          jwt.sign(payload, secret, { expiresIn: "1 day" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
            });
          });
        }
      });
    } else {
      res.json("Wrong email");
    }
  });
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
