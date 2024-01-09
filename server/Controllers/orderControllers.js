const orderModel = require("../models/order");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
  const {
    productIds,
    productNames,
    subTotal,
    shipping,
    total,
    name,
    address1,
    state,
    zip,
    phone,
    token,
  } = req.body;
  console.log("products", productNames);
  try {
    const user = jwt.verify(token, process.env.MY_SECRET_KEY);
    const orderDoc = new orderModel({
      userId: user.id,
      productIds,
      productNames,
      subTotal,
      shipping,
      total,
      name,
      address1,
      state,
      zip,
      phone,
    });

    orderDoc.save();

    userModel
      .updateOne({ _id: user.id }, { $set: { cart: [] } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return res
      .status(200)
      .json({ success: true, message: "Your Order is placed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while placing order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
