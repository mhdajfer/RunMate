const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subDesc: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  productWiseOffer:{
    type: Boolean,
    default: false,
  },
  categoryWiseOffer:{
    type: Boolean,
    default: false,
  }
});

const prodModel = mongoose.model("product", prodSchema);

module.exports = prodModel;
