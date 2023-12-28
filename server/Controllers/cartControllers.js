const cartModel = require("../models/cart");

exports.add = async (req, res) => {
  const {
    _id: productId,
    name: productName,
    quantity,
    price,
    images,
  } = req.body;
  const image = images[0];

  try {
    const cartDoc = new cartModel({
      productId,
      productName,
      quantity,
      price,
      image,
    });
    cartDoc.save();
    return res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error white adding to cart collection",
    });
  }
};
