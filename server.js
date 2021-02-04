const express = require("express");
//const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const secret = require("./config/key").secret;

//const { success, error } = require("consola");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profiles");
const roleRouter = require("./routes/role");
const User = require("./models/User");

// Bring in the App constants
//const { DB, PORT } = require("./config");
// Initialize the application

// Onliine db connect : mongodb://localhost:27017/schoolmanagementsystem
// const db = require("./config/key").mongoURI;
// try {
//   mongoose
//     .connect(
//       "mongodb+srv://sms:kingsly8@cluster0.leiln.mongodb.net/sms?retryWrites=true&w=majority",
//       {
//         useFindAndModify: true,
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//       }
//     )
//     .then(() => console.log("DB successfully connected"));
// } catch (error) {
//   console.log(error);
// }

// Middlewares
//app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize());
//require("./middlewares/passport")(passport);
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    console.log(accessToken, "tooken");
    const { userId, exp } = jwt.verify(accessToken, secret);
    console.log(userId, "userId");
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    res.locals.loggedInUser = User.findById(userId);
    next();
  } else {
    next();
  }
});

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/role", roleRouter);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
