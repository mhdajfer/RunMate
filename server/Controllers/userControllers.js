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
  const user = await UserModel.findOne({ email: username });
  console.log(user);

  //check user
  if (!user) res.json({ success: false, message: "user not found" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = CreateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        SameSite: "None",
      });

      console.log(res.getHeaders());
      return res
        .status(200)
        .json({ success: true, message: "login successful" });
    } else return res.json({ success: false, message: "login failed" });
  } catch (error) {
    console.log("error with bcrypt compare");
    console.log(res.getHeaders());
  }
};

exports.verify = async (req, res) => {};
