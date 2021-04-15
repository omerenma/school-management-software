const router = require("express").Router();

// Get role
router.get("/role", (req, res) => {
  res.json({ mgs: "Success!" });
});

// Add role

router.post("/role", (req, res) => {
  const { name, id } = req.body;
  res.json({ name, id });
});

// Edit role

// Delete role

module.exports = router;
