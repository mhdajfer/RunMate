const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  offerInPercentage: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
