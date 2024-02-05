const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
});

const bannerModel = mongoose.model("banner", bannerSchema);

module.exports = bannerModel;
