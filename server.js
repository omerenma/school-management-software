const express = require("express");
//const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

//const { success, error } = require("consola");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profiles");

// Bring in the App constants
//const { DB, PORT } = require("./config");
// Initialize the application
try {
  mongoose
    .connect("mongodb://localhost:27017/schoolmanagementsystem", {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("DB successfully connected"));
} catch (error) {
  console.log(error);
}

// Middlewares
//app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize());
//require("./middlewares/passport")(passport);
app.use(express.static(__dirname + "/public"));

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
