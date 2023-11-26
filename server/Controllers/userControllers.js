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
