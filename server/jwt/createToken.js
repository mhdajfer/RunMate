const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.CreateToken = (user) => {
  return jwt.sign({ ...user }, process.env.MY_SECRET_KEY, {
    expiresIn: "10m",
  });
};
