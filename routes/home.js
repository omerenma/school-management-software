const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<div><input type='text' placeholder='Name'></div>");
});

module.exports = router;
