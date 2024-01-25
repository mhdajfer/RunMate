const categoryModel = require("../models/category");

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
