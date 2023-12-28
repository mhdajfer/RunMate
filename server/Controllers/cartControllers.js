const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.MY_SECRET_KEY);

  const {
    _id: productId,
    name: productName,
    quantity,
    price,
    images,
  } = req.body;
  const image = images[0];
  const cartItems = {
    productId,
    productName,
    quantity,
    price,
    image,
  };

  try {
    UserModel.updateOne({ _id: user.id }, { $push: { cart: cartItems } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error white adding to cart collection",
    });
  }
};

exports.get = async (req, res) => {
  const token = req.cookies.token;
  const user = jwt.verify(token, process.env.MY_SECRET_KEY);

  const userData = await UserModel.find({ _id: user.id }, { cart: 1 });

  const cart = userData[0].cart;
  res.status(200).json({ success: true, data: cart });
};
