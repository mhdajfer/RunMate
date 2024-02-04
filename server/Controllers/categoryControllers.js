const categoryModel = require("../models/category");
const prodModel = require("../models/product");

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
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { category } = req.body;

  try {
    await categoryModel.findOneAndDelete({ _id: category._id });
    return res
      .status(200)
      .json({ success: true, message: "Category deleted " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting category - backend",
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
    return res.status(200).json({ success: true, message: "Offer Applied" });
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
    return res.status(200).json({ success: true, message: "Offer Cancelled" });
  } catch (error) {
    console.log("error while cancelling offer", error);
    return res.json({ success: false, message: "offer not applied" });
  }
};
