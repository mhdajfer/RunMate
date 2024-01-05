const mongoose = require("mongoose");
const { array } = require("../multer");

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productIds: {
    type: Array,
    required: true,
  },
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
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
