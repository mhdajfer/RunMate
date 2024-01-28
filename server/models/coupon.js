const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  discount: {
    type: Number,
    requires: true,
  },
  discountMax: {
    type: Number,
    requires: true,
  },
});

const couponModel = mongoose.model("coupon", couponSchema);

module.exports = couponModel;
