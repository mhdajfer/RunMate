const orderModel = require("../models/order");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const prodModel = require("../models/product");
const razorpay = require("razorpay");
const crypto = require("crypto");

exports.add = async (req, res) => {
  const {
    couponId,
    productIds,
    subTotal,
    shipping,
    total,
    name,
    address1,
    state,
    zip,
    phone,
    token,
    mode,
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
      subTotal,
      coupon: couponId,
      shipping,
      total,
      name,
      address1,
      state,
      zip,
      phone,
      mode,
      paymentStatus: false,
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

exports.create = async (req, res) => {
  const {
    couponId,
    productIds,
    subTotal,
    shipping,
    total,
    name,
    address1,
    state,
    zip,
    phone,
    token,
    mode,
    amount,
  } = req.body;

  const user = jwt.verify(token, process.env.MY_SECRET_KEY);

  var instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "receipt#1",
    partial_payment: false,
  };

  const result = await instance.orders.create(options);
  const orderDoc = new orderModel({
    userId: user.id,
    products: productIds.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    })),
    subTotal,
    coupon: couponId,
    shipping,
    total,
    name,
    address1,
    state,
    zip,
    phone,
    mode,
    razor_orderId: result.id,
  });
  orderDoc.save();

  res.json({ success: true, data: result });
};

exports.validatePayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (razorpay_signature === expected_signature) {
    const result = await orderModel.updateOne(
      { razor_orderId: razorpay_order_id },
      {
        $set: {
          // Fields to add or update regardless of insert/update
          paymentStatus: true,
          razor_paymentId: razorpay_payment_id,
          razor_signature: razorpay_signature,
        },
      }
    );

    const user = await orderModel.find(
      { razor_orderId: razorpay_order_id },
      { userId: 1, _id: 0 }
    );
    // emptying cart
    userModel
      .updateOne({ _id: user[0].userId }, { $set: { cart: [] } })
      .then((response) => {
        console.log("saved");
      })
      .catch((error) => {
        console.log(error);
      });

    return res.json({ success: true });
  } else {
    console.log("not validated");
  }
};

exports.getKey = async (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
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
    if (orderStatus === "Delivered") {
      await orderModel.updateOne(
        { _id: orderId },
        { $set: { status: orderStatus, paymentStatus: true } }
      );
    } else {
      await orderModel.updateOne(
        { _id: orderId },
        { $set: { status: orderStatus } }
      );
    }

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
