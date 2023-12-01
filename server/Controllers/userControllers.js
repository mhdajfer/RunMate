const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

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

  if (!(username && password)) {
    res.json({ message: "enter username and password" });
  }

  const user = await UserModel.findOne({ email: username });
  console.log(user);

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({ success: true, message: "login successful" });
    } else return res.json({ success: false, message: "login failed" });
  } catch (error) {
    console.log("error with bcrypt compare");
  }
};
