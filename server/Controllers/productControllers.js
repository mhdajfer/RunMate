const prodModel = require("../models/product");
const upload = require("../multer");
const path = require("path");
const fs = require("fs");

exports.allProducts = async (req, res) => {
  try {
    const products = await prodModel.find({});
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log("error in allProducts controller:", error);
  }
};

exports.getOneProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const products = await prodModel.find({ _id: productId });

    return res.json({ success: true, data: products[0] });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Products not found" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }
      const images = req.files;
      const filenames = images.map((file) => file.originalname);
      const { brand, desc, stock, price, category, name, subDesc } = req.body;
      if (
        !brand ||
        !desc ||
        !stock ||
        !price ||
        !category ||
        !name ||
        !subDesc ||
        !filenames
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
        images: filenames,
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

      await prodModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            brand: brand,
            desc: desc,
            stock: stock,
            price: price,
            category: category,
            name: name,
            subDesc: subDesc,
          },
        }
      );

      await prodModel.updateOne({ _id: id }, { $push: { images: image } });

      res.status(201).json({ success: true, message: "Product updated" });
    });
  } catch (error) {
    console.log("error while editing form", error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prodModel.find({ _id: id });
    await prodModel.updateOne(
      { _id: id },
      { $set: { isDeleted: !product[0].isDeleted } }
    );
    res.status(200).json({
      success: true,
      message: `${
        product[0].isDeleted ? "Product Restored" : "Product Deleted"
      }`,
    });
  } catch (error) {
    console.log("error while deleting product", error);
  }
};

exports.deleteImage = async (req, res) => {
  const { image, productId } = req.body;
  const filePath = path.join("uploads", image);
  console.log("hai");

  try {
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    await prodModel.updateOne({ _id: productId }, { $pull: { images: image } });
    res
      .status(200)
      .json({ success: true, message: "image deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "Backend error in deleting image" });
  }
};

exports.get = async (req, res) => {
  const { category } = req.body;
  let data;
  try {
    if (category === "Men") {
      data = await prodModel.find({ category: category }, { isDeleted: false });
    } else if (category === "all") {
      data = await prodModel.find({ isDeleted: false });
    } else if (category === "Best Selling") {
      data = await prodModel.find({ category: category }, { isDeleted: false });
    } else if (category === "Women") {
      data = await prodModel.find({ category: category }, { isDeleted: false });
    } else if (category === "Sports") {
      data = await prodModel.find({ category: category }, { isDeleted: false });
    }
    res.json({
      success: true,
      message: "successfully retrieved product details",
      data: data,
    });
  } catch (error) {
    console.log("error :", error);
  }
};
