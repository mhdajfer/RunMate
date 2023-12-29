const orderModel = require("../models/order");

exports.add = async (req, res) => {
  try {
    const {
      productIds,
      subTotal,
      shipping,
      total,
      name,
      address1,
      address2,
      state,
      zip,
      phone,
    } = req.body;

    const orderDoc = new orderModel({
      productIds,
      subTotal,
      shipping,
      total,
      name,
      address1,
      address2,
      state,
      zip,
      phone,
    });

    orderDoc.save();
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
