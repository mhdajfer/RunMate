const UserModel = require("../models/user");
const prodModel = require("../models/product");
const jwt = require("jsonwebtoken");
const StatusCode = require("../Utils/StatusCode");

exports.add = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: "please login", success: false });
  const user = jwt.verify(token, "my_secret_key");

  try {
    const {
      _id: productId,
      name: productName,
      quantity,
      price,
      images,
      discountPrice,
    } = req.body;

    // Validate required fields
    if (!productId || !productName || !quantity || !price) {
      return res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check product stock
    const product = await prodModel.findById(productId);
    if (!product) {
      return res.status(StatusCode.NOT_FOUND).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(StatusCode.BAD_REQUEST).json({
        success: false,
        message: "Product out of stock",
      });
    }

    const image = images[0];
    const itemExists = await UserModel.findOne({
      cart: { $elemMatch: { productId: productId } },
    });

    console.log("exists", itemExists);

    if (itemExists) {
      // Check if incrementing quantity exceeds stock
      const cartItem = itemExists.cart.find(
        (item) => item.productId.toString() === productId
      );
      if (cartItem && cartItem.quantity + 1 > product.stock) {
        return res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          message: "Cannot add more items than available in stock",
        });
      }

      await UserModel.updateOne(
        { _id: user.id, "cart.productId": productId },
        { $inc: { "cart.$.quantity": 1 } }
      );
    } else {
      const cartItems = {
        productId,
        productName,
        quantity: 1,
        price,
        image,
        discountPrice,
      };

      await UserModel.updateOne(
        { _id: user.id },
        { $push: { cart: cartItems } }
      );
    }

    return res.status(StatusCode.OK).json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.error("Error in add to cart:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while adding to cart",
    });
  }
};

exports.get = async (req, res) => {
  const user = req?.user;

  const userData = await UserModel.find({ _id: user.id }, { cart: 1 });

  let cart = userData[0].cart;
  res.status(StatusCode.OK).json({ success: true, data: cart });
};

exports.remove = async (req, res) => {
  const { item } = req.body;
  const token = req.cookies.token;
  const user = jwt.verify(token, "my_secret_key");

  try {
    await UserModel.updateOne(
      { _id: user.id },
      { $pull: { cart: { _id: item._id } } }
    );
    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Item Removed" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "error white deleting: backend error" });
  }
};

exports.stockCheck = async (req, res) => {
  const productIds = req.body;

  //checking the stocks of products
  for (const id of productIds) {
    const stock = await prodModel.find(
      { _id: id },
      { _id: 0, stock: 1, name: 1 }
    );
    if (stock[0].stock <= 0)
      return res.json({
        success: false,
        message: `${stock[0].name} is out of stock, please remove from cart`,
      });
  }
  return res.json({ success: true, message: "success" });
};
