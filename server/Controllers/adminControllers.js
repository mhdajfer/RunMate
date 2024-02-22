const adminModel = require("../models/admin");
const userModel = require("../models/user");
const ordersModel = require("../models/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../Utils/Jwt/createToken");
const fs = require("fs");

exports.signup = async (req, res) => {
  const user = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userDoc = new adminModel({ ...user, password: hashedPassword });
    userDoc.save();
    console.log(userDoc);
    return res.json({
      success: true,
      message: "admin registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error in adminController" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //check if the input field is empty
  if (!username || !password) {
    return res.json({ message: "enter username and password" });
  }

  //get user
  const user = await adminModel.findOne(
    { email: username },
    { _id: 1, password: 1, name: 1 }
  );

  //check user
  if (!user) res.json({ success: false, message: "user not found" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = CreateToken(user._id.toString());
      res.status(200).json({
        success: true,
        message: "login successful",
        data: token,
      });
    } else return res.json({ success: false, message: "login failed" });
  } catch (error) {
    console.log("error with bcrypt compare");
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find({});

    return res.json({ success: true, message: "got orders", data: orders });
  } catch (error) {
    console.log("error while getting orders", error);
    return res.json({ success: false, message: error.message });
  }
};

exports.blockUser = async (req, res) => {
  const { user } = req.body;
  let msg = "";
  if (user.isBlocked) {
    msg = "User Unblocked";
  } else {
    msg = "User Blocked";
  }
  try {
    await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { isBlocked: !user.isBlocked } }
    );
    res.status(200).json({ success: true, message: msg });
  } catch (error) {
    console.log("error while block user", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.verify = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "no token found" });

  try {
    const JwtUser = jwt.verify(token, "my_secret_key");
    const user = await adminModel.findOne({ _id: JwtUser.id });

    if (!user)
      return res.json({ success: false, message: "user not Authorized" });
    return res.json({
      success: true,
      userName: user.name,
      message: "user authorized",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
    else {
      console.log("Error while trying to login : ", error);
    }
  }
};

exports.logout = async (req, res) => {
  return res
    .cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logged out" });
};

exports.isUserBlocked = async (req, res) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, "my_secret_key");
    const isBlocked = await adminModel.find(
      { _id: user.id },
      { isBlocked: 1, _id: 0 }
    );
    if (isBlocked.length === 0)
      return res.json({
        success: false,
        message: "User Not found with the token in cookie",
      });
    if (isBlocked[0].isBlocked)
      return res.json({ success: false, message: "User is blocked" });
    else return res.json({ success: true });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
    console.log("error while checking the user is blocked", error);
    return res.json({
      success: false,
      message: "Something went wrong in server",
    });
  }
};
