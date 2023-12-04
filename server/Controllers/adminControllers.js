const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../jwt/createToken");

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
  if (!(username && password)) {
    res.json({ message: "enter username and password" });
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
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "login successful",
        });
    } else return res.json({ success: false, message: "login failed" });
  } catch (error) {
    console.log("error with bcrypt compare");
  }
};

exports.verify = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "no token found" });

  try {
    const JwtUser = jwt.verify(token, process.env.MY_SECRET_KEY);
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
