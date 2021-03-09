const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Configur JSON parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profiles");
const roleRouter = require("./routes/role");

app.use(express.static(__filename, +"./index.html"));
// Configur Route paths
app.use("/api/home", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/role", roleRouter);

// Custom 404 page
app.use((req, res, next) => {
  res.type("text/plain");
  res.status(404).json({ response: "Resource not found" });
  next();
});

// Custom Unauthenticated page
app.use((req, res, next) => {
  res.type("text/plain");
  res.status(406).json("Unauthorized");
  next();
});
// // Custom 500 page
app.use((req, res, next) => {
  res.type("text/plain").send("Internal server error");
  next();
});

// Configure serer's port
const port = process.env.PORT || 5000;
const serverMessage = `Express server running on port ${port}`;
app.listen(port, () => {
  console.log(serverMessage);
  console.log(app.get("env"));
});
