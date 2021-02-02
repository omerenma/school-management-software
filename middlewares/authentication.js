const jwt = require("jsonwebtoken");
const accessTokenSecret = require("../config/key");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret.secret, (err, user) => {
      if (!err) {
        req.user = user;
      }
      res.status(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = authenticateJWT;
