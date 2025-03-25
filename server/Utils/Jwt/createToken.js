const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.CreateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
