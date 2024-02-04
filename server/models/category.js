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
  },
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
