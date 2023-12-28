const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    defaultValue: 1,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  }
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
