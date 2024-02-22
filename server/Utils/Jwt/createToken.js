const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.CreateToken = (userId) => {
  return jwt.sign({ id: userId }, "my_secret_key", {
    expiresIn: "1h",
  });
};
