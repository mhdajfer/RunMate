const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  addresses: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
