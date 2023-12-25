const prodModel = require("../models/product");
const upload = require("../multer");

exports.allProducts = async (req, res) => {
  try {
    const products = await prodModel.find({});
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log("error in allProducts controller:", error);
  }
};

exports.addProduct = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }
      const image = req.file?.filename;
      const { brand, desc, stock, price, category, name, subDesc } = req.body;
      if (
        !brand ||
        !desc ||
        !stock ||
        !price ||
        !category ||
        !name ||
        !subDesc ||
        !image
      ) {
        return res.json({ success: false, message: "fill all fields" });
      }

      const prodDoc = new prodModel({
        name,
        subDesc,
        brand,
        desc,
        stock,
        price,
        category,
        image,
      });
      await prodDoc.save();

      res
        .status(201)
        .json({ success: true, message: "Product added successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.edit = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const { brand, desc, stock, price, category, id, name, subDesc } =
        req.body;
      const image = req.file?.filename;

      const prodDoc = new prodModel({
        brand,
        desc,
        stock,
        price,
        category,
        image,
        name,
        subDesc,
      });

      await prodModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            brand: brand,
            desc: desc,
            stock: stock,
            price: price,
            category: category,
            image: image,
            name: name,
            subDesc: subDesc,
          },
        }
      );

      res.status(201).json({ success: true, message: "Product updated" });
    });
  } catch (error) {
    console.log("error while editing form", error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await prodModel.findOneAndDelete({ _id: id });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error while deleting product", error);
  }
};

exports.get = async (req, res) => {
  try {
    const data = await prodModel.find({});
    res.json({
      success: true,
      message: "successfully retrieved product details",
      data: data,
    });
  } catch (error) {
    console.log("error :", error);
  }
};
