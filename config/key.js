module.exports = {
  mongoURI:
    "mongodb+srv://sms:kingsly8@cluster0.leiln.mongodb.net/sms?retryWrites=true&w=majority",

  secret: "ihainlijanlijnsalijnailn",
};

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
