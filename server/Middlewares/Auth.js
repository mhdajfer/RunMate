const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const adminModel = require("../models/admin");

exports.isUserLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token)
      return res.json({ success: false, message: "user not Authenticated" });

    const jwtUser = jwt.verify(token, 'my_secret_key');
    const userExist = await UserModel.findOne({ _id: jwtUser.id });

    if (!userExist)
      return res.json({ success: false, message: "user not found" });

    req.user = userExist;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({ success: false, message: "token expired" });
    console.log(error);
    return res.json({ success: false, message: "Error while user Login" });
  }
};

exports.isAdminLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "user not Authenticateddddd" });

    const jwtUser = jwt.verify(token, 'my_secret_key');
    const userExist = await adminModel.findOne({ _id: jwtUser.id });

    if (!userExist)
      return res.json({ success: false, message: "user not found" });

    req.user = userExist;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({ success: false, message: "token expired" });
    else return res.status(404);
  }
};
