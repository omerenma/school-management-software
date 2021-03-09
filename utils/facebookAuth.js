const db = require("../config/db_connection");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

// Get user id from postgres table

passport.serializeUser((user, done) => {
  done(null, user);
  //done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db("users")
    .select(id)
    .then((err, user) => {
      err || !user ? done(err, null) : done(null, user);
    });
});

module.exports = (app, options) => {
  // If success and failure aren't redirect specified, set some reasonable defaults
  if (!options.successRedirect) {
    options.successRedirect = "/account";
  }
  if (!options.failureRedirects) {
    options.failureRedirects = "/login";
  }
  return {
    init: () => {}, // TODO,
    registerRoutes: () => {}, // TODO
  };
};
