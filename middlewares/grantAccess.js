const role = require("./rolePermission");
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = role.can(req.user.role)[action][resource];
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this role",
        });
      }
      next();
    } catch (error) {}
  };
};
