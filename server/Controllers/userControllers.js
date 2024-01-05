const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../Utils/Jwt/createToken");
const sendMail = require("../Utils/NodeMailer/sendMail");
const { add } = require("./cartControllers");

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res
      .status(200)
      .json({ success: true, message: "retrieved users", users: users });
  } catch (error) {
    console.log("error while getting users", error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findOneAndDelete({ _id: id });
    res.status(200).json({ success: true, message: "user deleted" });
  } catch (error) {
    console.log("error while deleting user", error);
  }
};

exports.edit = async (req, res) => {
  let user = req.body;
  console.log(user);
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user = { ...user, password: hashedPassword };
  } else {
    delete user.password;
  }

  try {
    await UserModel.findOneAndUpdate({ _id: user.id }, { ...user });
    res.status(200).json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log("error while editing user", error);
  }
};

exports.getAddress = async (req, res) => {
  const { userId } = req.body;
  try {
    let address = await UserModel.find({ _id: userId }, { addresses: 1 });
    address = address[0].addresses;
    return res.json({
      success: true,
      message: "successfully found address",
      address: address,
    });
  } catch (error) {
    console.log("error while getting address", error);
    return res.json({ success: false, message: "error while getting address" });
  }
};

exports.addAddress = async (req, res) => {
  const address = req.body;
  console.log(address);
  const userId = address.id;
  delete address.id;
  try {
    UserModel.updateOne({ _id: userId }, { $push: { addresses: address } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return res.json({ success: true, message: "Address Updated" });
  } catch (error) {
    console.log("error while adding address", error);
    return res.json({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const { address, userId } = req.body;

  try {
    UserModel.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: address._id } } }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return res.json({ success: true, message: "Address Deleted" });
  } catch (error) {
    console.log("error while deleting one address: " + error);
    return res.json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    UserModel.updateOne({ email: email }, { password: hashedPassword })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({ success: true, message: "Password Updated" });
  } catch (error) {
    console.log("error while changing password", error);
    return res.json({ success: false, message: error.message });
  }
};

exports.activate = async (req, res) => {
  const token = req.params?.token;

  const user = jwt.verify(token, process.env.MY_SECRET_KEY);

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userDoc = new UserModel({ ...user, password: hashedPassword });
  await userDoc.save();
  res.send("User id Activated");
};

exports.signUp = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.age || !user.phone || !user.email || !user.password) {
    return res.json({ success: false, message: "Fill all fields" });
  }

  const existUser = await UserModel.find({ email: user.email });
  if (existUser._id) {
    console.log(existUser);

    return res.json({ success: false, message: "User already exists" });
  }

  const token = jwt.sign(user, process.env.MY_SECRET_KEY, {
    expiresIn: "5m",
  });

  const url = `${process.env.SERVER_URL}/user/activate/${token}`;

  sendMail(user.email, url);

  res.json({ success: true, message: "Check your mail" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //check if the input field is empty
  if (!username || !password) {
    return res.json({ message: "enter username and password" });
  }

  //get user
  const user = await UserModel.findOne(
    { email: username },
    { _id: 1, password: 1, isBlocked: 1 }
  );

  //check user
  if (!user) return res.json({ success: false, message: "user not found" });

  //check whether blocked
  if (user.isBlocked)
    return res.json({ success: false, message: "user is blocked" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = CreateToken(user._id.toString());
      res.status(200).cookie("tokenn", token).json({
        success: true,
        message: "login successful",
        token: token,
      });
    } else return res.json({ success: false, message: "Incorrect Password" });
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

exports.getOneUser = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.json({ success: false });

  try {
    const user = jwt.verify(token, process.env.MY_SECRET_KEY);
    const userDetails = await UserModel.find({ _id: user.id });
    res.json({ success: true, message: "got user details", user: userDetails });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
        expired: true,
        success: false,
        message: "token expired, login again",
      });
    else {
      console.log(error);
    }
  }
};

exports.logout = async (req, res) => {
  return res
    .cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logged out" });
};
