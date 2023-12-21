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
    type: String,
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
  image: {
    type: String,
    required: true,
  },
});

const prodModel = mongoose.model("product", prodSchema);

module.exports = prodModel;
