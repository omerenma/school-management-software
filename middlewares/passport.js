// const User = require("../models/User");
// const secret = require("../config/key").secret;
// const { Strategy, ExtractJwt } = require("passport-jwt");

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: secret,
// };
// module.exports = (passport) => {
//   passport.use(
//     new Strategy(opts, async (payload, done) => {
//       await User.findById(payload.user_id)
//         .then(async (user) => {
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => {
//           return done(null, false);
//         });
//     })
//   );
// };
