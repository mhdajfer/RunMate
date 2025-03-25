const categoryModel = require("../models/category");
const prodModel = require("../models/product");
const StatusCode = require("../Utils/StatusCode");

exports.addCategory = async (req, res) => {
  const { name, desc } = req.body;
  if (!name)
    return res.json({ success: false, message: "Enter Category name" });

  try {
    const dataExist = await categoryModel.findOne({ name: name.toLowerCase() });
    if (dataExist)
      return res.json({ success: false, message: "Category already exists" });
    const categoryDoc = new categoryModel({
      name: name.toLowerCase(),
      desc: desc.toLowerCase(),
    });
    categoryDoc.save();
    res
      .status(201)
      .json({ success: true, message: "Category added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.listCategory = async (req, res) => {
  try {
    const data = await categoryModel.find({});
    res.status(StatusCode.OK).json({ success: true, data: data });
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { category } = req.body;

  try {
    // Check if products exist in this category
    const productsExist = await prodModel.findOne({ category: category.name });

    if (productsExist) {
      return res.status(StatusCode.OK).json({
        success: false,
        message: "Cannot delete category with existing products",
      });
    }

    // Soft delete the category
    await categoryModel.findOneAndUpdate(
      { _id: category._id },
      { $set: { isDeleted: true } }
    );

    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while deleting category - backend",
    });
  }
};

exports.restore = async (req, res) => {
  const { category } = req.body;
  try {
    await categoryModel.findOneAndUpdate(
      { _id: category._id },
      { $set: { isDeleted: false } }
    );
    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Category restored successfully" });
  } catch (error) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while restoring category",
    });
  }
};

exports.applyOffer = async (req, res) => {
  const { _id, name, discount } = req.body;

  try {
    await categoryModel.updateOne(
      { _id: _id },
      { $set: { offerInPercentage: discount } }
    );
    const products = await prodModel.aggregate([
      { $match: { category: name } },
    ]);
    console.log(products);

    for (const product of products) {
      if (!product.productWiseOffer) {
        console.log("here");
        await prodModel.updateOne(
          { _id: product?._id },
          {
            $set: {
              categoryWiseOffer: true,
              discountPrice: Math.floor(
                product?.price - (product?.price * discount) / 100
              ),
            },
          }
        );
      }
    }
    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Offer Applied" });
  } catch (error) {
    console.log("error while applying offer", error);
    return res.json({ success: false, message: "offer not applied" });
  }
};

exports.cancelOffer = async (req, res) => {
  const category = req.body;

  try {
    await categoryModel.updateOne(
      { _id: category?._id },
      { $set: { offerInPercentage: 0 } }
    );
    const products = await prodModel.aggregate([
      { $match: { category: category?.name } },
    ]);

    for (const product of products) {
      if (product?.categoryWiseOffer) {
        await prodModel.updateOne(
          { _id: product?._id },
          {
            $set: { categoryWiseOffer: false, discountPrice: 0 },
          }
        );
      }
    }
    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Offer Cancelled" });
  } catch (error) {
    console.log("error while cancelling offer", error);
    return res.json({ success: false, message: "offer not applied" });
  }
};
