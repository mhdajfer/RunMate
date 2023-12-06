const prodModel = require("../models/product");
const upload = require("../multer");

exports.addProduct = async (req, res) => {
  console.log("here");
  try {
    upload.single("image")(req, res, async (err) => {
      console.log(req.body);
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const { brand, desc, stock, price, category } = req.body;
      const image = req.file.filename;

      const prodDoc = new prodModel({
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

exports.get = async (req, res) => {
  try {
    const data = await prodModel.find({});
    res.json({ success: true, message: "successfully retrieved product details", data: data });
  } catch (error) {
    console.log("error :", error);
  }
};
