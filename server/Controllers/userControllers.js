const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CreateToken } = require("../Utils/Jwt/createToken");
const sendMail = require("../Utils/NodeMailer/sendMail");

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
    await UserModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
    res.status(200).json({ success: true, message: "user deleted" });
  } catch (error) {
    console.log("error while deleting user", error);
  }
};

exports.restore = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.updateOne({ _id: id }, { $set: { isDeleted: false } });
    res.status(200).json({ success: true, message: "user restored" });
  } catch (error) {
    console.log("error while restoring user", error);
  }
};

exports.edit = async (req, res) => {
  let user = req.body;
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

exports.editAddress = async (req, res) => {
  const token = req.cookies.token;
  const address = req.body;

  try {
    const user = jwt.verify(token, "my_secret_key");
    const result = await UserModel.updateOne(
      { _id: user.id, "addresses._id": address._id },
      {
        $set: {
          "addresses.$.address1": address.address1,
          "addresses.$.city": address.city,
          "addresses.$.state": address.state,
          "addresses.$.pincode": address.pincode,
        },
      }
    );

    return result.modifiedCount > 0
      ? res.json({ success: true, message: "Address Updated" })
      : res.json({ success: false, message: "No Change in Address" });
  } catch (error) {
    console.log("error while editing address", error);
    return res.json({ success: false, message: "error while editing address" });
  }
};

exports.addAddress = async (req, res) => {
  const address = req.body;
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

  const user = jwt.verify(token, "my_secret_key");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const referral = user?.phone.slice(-4) + user?.name.slice(-4);
  let referredUser;
  if (user?.referral) {
    referredUser = await UserModel.findOne({
      "referral.myCode": user?.referral,
    });
    await UserModel.updateOne(
      { _id: referredUser._id },
      { $inc: { "referral.referralAmount": 100, "wallet.balance": 100 } }
    );
  }

  const userData = user?.referral
    ? {
        ...user,
        password: hashedPassword,
        "referral.myCode": referral,
        "referral.referralAmount": 50,
        "wallet.balance": 50,
        "referral.signUpViaReferral": true,
        "referral.usedReferral": user.referral,
      }
    : {
        ...user,
        password: hashedPassword,
        "referral.myCode": referral,
      };

  const userDoc = new UserModel(userData);
  await userDoc.save();
  res.redirect("https://runmate.online");
};

exports.signUp = async (req, res) => {
  const user = req.body;

  const existUser = await UserModel.find({ email: user.email });
  if (existUser._id) {
    return res.json({ success: false, message: "User already exists" });
  }

  if (user?.referral) {
    const referredUser = await UserModel.findOne({
      "referral.myCode": user?.referral,
    });
    if (!referredUser)
      return res.json({ success: false, message: "Referral not found" });
  }

  const token = jwt.sign(user, "my_secret_key", {
    expiresIn: "5m",
  });

  const url = `https://runmate.online/api/user/activate/${token}`;

  sendMail(user.email, url);

  res.json({ success: true, message: "Check your mail" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //check if the input field is empty
  if (!username || !password) {
    return res.json({ success: false, message: "enter username and password" });
  }

  //get user
  const user = await UserModel.findOne(
    { email: username },
    { _id: 1, password: 1, isBlocked: 1, isDeleted: 1 }
  );
  //check user
  if (!user) return res.json({ success: false, message: "user not found" });

  //check user deleted
  if (user.isDeleted)
    return res.json({ success: false, message: "User deleted" });

  //check whether blocked
  if (user.isBlocked)
    return res.json({ success: false, message: "user is blocked" });

  try {
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = CreateToken(user._id.toString());
      //.cookie("token", token)
      res.status(200).json({
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
    const JwtUser = jwt.verify(token, "my_secret_key");
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
  const user = req?.user;

  try {
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

exports.getAllAddress = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, "my_secret_key");

  try {
    const data = await UserModel.find(
      { _id: user.id },
      { addresses: 1, _id: 0 }
    );
    const addresses = data[0].addresses;
    return res.json({ success: true, data: addresses });
  } catch (error) {
    console.log("error while getting all addresses", error);
    return res.json({
      success: false,
      message: "error while getting all addresses",
    });
  }
};

exports.logout = async (req, res) => {
  return res
    .cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logged out" });
};

exports.isUserBlocked = async (req, res) => {
  const user = req?.user;
  try {
    const isBlocked = await UserModel.find(
      { _id: user.id },
      { isBlocked: 1, _id: 0 }
    );
    if (isBlocked[0].isBlocked)
      return res.json({ success: false, message: "User is blocked" });
    else return res.json({ success: true });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.json({
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
