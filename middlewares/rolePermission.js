const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user").readOwn("profile").updateOwn("profile");

  ac.grant("headofschool");

  ac.grant("admin")
    .extend("user")
    .extend("headofschool")
    .updateAny("profile")
    .deleteAny("profile")
    .readOwn("profile")
    .readAny("profile");

  return ac;
})();
