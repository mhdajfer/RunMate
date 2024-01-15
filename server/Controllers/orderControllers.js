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
    //reducing the stock of the product
    productIds.forEach((prod) => {
      prodModel
        .updateOne({ _id: prod.productId }, { $inc: { stock: -prod.quantity } })
        .then((res) => {
          console.log(res);
        });
    });

    const user = jwt.verify(token, process.env.MY_SECRET_KEY);
    const orderDoc = new orderModel({
      userId: user.id,
      products: productIds.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
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

exports.changeStatus = async (req, res) => {
  const { orderStatus, orderId } = req.body;

  try {
    await orderModel.updateOne(
      { _id: orderId },
      { $set: { status: orderStatus } }
    );
    return res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderDetails = async (req, res) => {
  const orderId = req.params.id;

  try {
    const data = await orderModel
      .findById(orderId)
      .populate("products.productId");
    console.log(data);

    return res.json({ success: true, data: data });
  } catch (error) {
    console.log("error while getting order details", error);
    return res.json({
      success: false,
      message: "error while getting order details",
    });
  }
};
