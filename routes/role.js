const router = require("express").Router();
const Role = require("../models/Role");

// Get role
router.get("/role", (req, res) => {
  res.json({ mgs: "Success!" });
});

// Add role

router.post("/role", (req, res) => {
  const { role } = req.body;
  console.log(role);
});

// Edit role

// Delete role

module.exports = router;
