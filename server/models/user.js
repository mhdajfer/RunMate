const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
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
  addresses: [
    {
      address1: {
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
  ],
  password: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
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
      },
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
