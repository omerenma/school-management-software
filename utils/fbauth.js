const auth = require("./facebookAuth")(app, {
  providers: credentials.authProviders,
  successRedirect: "/account",
  failureRedirect: "/unauthorized",
});
