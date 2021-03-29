const jwt_decode = require("jwt-decode");
const role = (req, res, next) => {
  const token = req.headers["authorization"];
  const decoded = jwt_decode(token);
  if (decoded.role !== 1) {
    res.status(401).json({ message: "Unauthorized to view this resource" });
  }
  next();
};

module.exports = role;
