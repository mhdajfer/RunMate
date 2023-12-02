const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../jwt/createToken");

exports.signUp = async (req, res, next) => {
  const user = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userDoc = new UserModel({ ...user, password: hashedPassword });
    await userDoc.save();
    res.json({ message: "user registered successfully" });
  } catch (error) {
    console.log("Error while Registration : ", error);
    res.json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //check if the input field is empty
  if (!(username && password)) {
    res.json({ message: "enter username and password" });
  }

  //get user
  const user = await UserModel.findOne(
    { email: username },
    { _id: 1, password: 1 }
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
        .json({ success: true, message: "login successful" });
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
    const user = await UserModel.findOne({ _id: JwtUser.id });
    if (!user)
      return res.json({ success: false, message: "user not Authorized" });
    return res.json({ success: true, message: "user authorized" });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
  }
};

exports.logout = async (req, res) => {
  return res
    .cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logged out" });
};
