const orderModel = require("../models/order");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const prodModel = require("../models/product");

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

  try {
    //checking the stocks of products
    for (const id of productIds) {
      const stock = await prodModel.find(
        { _id: id },
        { _id: 0, stock: 1, name: 1 }
      );
      if (stock[0].stock <= 0)
        return res.json({
          success: false,
          message: `${stock[0].name} is out of stock, please remove from cart`,
        });
    }

    //reducing the stock of the product
    productIds.forEach((id) => {
      prodModel.updateOne({ _id: id }, { $inc: { stock: -1 } }).then((res) => {
        console.log(res);
      });
    });

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
        console.log("saved");
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
