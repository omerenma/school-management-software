const jwt = require("jsonwebtoken");
const secretOrKey = require("../config/keys_dev").secretOrKey;

const authenticate = (req, res, next) => {
  // Read the value of the authorization header
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader) {
    // We spilt the value of the authorization header
    // since it has the format of Bearer [JWT_TOKEN]
    //we have split the value by the space and separated the token.
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Access denied" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401);
  }
};
module.exports = authenticate;
