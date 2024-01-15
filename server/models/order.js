const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  productNames: {
    type: Array,
    required: true,
  },
  address1: {
    type: String,
    reuired: true,
  },
  name: {
    type: String,
    required: true,
  },

  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
