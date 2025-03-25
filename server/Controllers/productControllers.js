const prodModel = require("../models/product");
const categoryModel = require("../models/category");
const upload = require("../multer");
const path = require("path");
const fs = require("fs");
const uploadToCloudinary = require("../Utils/CloudinaryUpload");
const StatusCode = require("../Utils/StatusCode");

exports.allProducts = async (req, res) => {
  try {
    const products = await prodModel.find({ isDeleted: false });
    res.status(StatusCode.OK).json({ success: true, products: products });
  } catch (error) {
    console.log("error in allProducts controller:", error);
  }
};

exports.validateCartProducts = async (req, res) => {
  try {
    const { products } = req.body;

    // Check each product
    const productChecks = await prodModel.find({
      _id: { $in: products.map((p) => p.productId) },
      isDeleted: true,
    });

    // If any deleted products found, return false
    if (productChecks.length > 0) {
      return res.json({
        success: false,
        message: "Some products are no longer available",
      });
    }

    return res.json({ success: true });
  } catch (error) {
    console.log("Error in validateCartProducts:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.allProductsForAdmin = async (req, res) => {
  try {
    const products = await prodModel.find({});
    res.status(StatusCode.OK).json({ success: true, products: products });
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

// exports.addProduct = async (req, res) => {
//   try {
//     upload.array("files")(req, res, async (err) => {
//       if (err) {
//         return res.json({ success: false, message: err.message });
//       }
//       const images = req.files;
//       const filenames = images.map((file) => file.filename);
//       const { brand, desc, stock, price, category, name, subDesc } = req.body;
//       if (
//         !brand ||
//         !desc ||
//         !stock ||
//         !price ||
//         !category ||
//         !name ||
//         !subDesc ||
//         !filenames
//       ) {
//         return res.json({ success: false, message: "fill all fields" });
//       }

//       var imageUrlList = [];
//       console.log(req.files);

//       for (var i = 0; i < req.files.length; i++) {
//         let filepath = "uploads/" + req.files[i].filename;
//         var result = await uploadToCloudinary(filepath);
//         imageUrlList.push(result.url);
//       }

//       const prodDoc = new prodModel({
//         name,
//         subDesc,
//         brand,
//         desc,
//         stock,
//         price,
//         category,
//         images: imageUrlList,
//       });
//       await prodDoc.save();

//       res
//         .status(StatusCode.CREATED)
//         .json({ success: true, message: "Product added successfully" });
//     });
//   } catch (error) {
//     res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
//   }
// };

exports.addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "No files uploaded" });
    }

    const { brand, desc, stock, price, category, name, subDesc } = req.body;
    if (!brand || !desc || !stock || !price || !category || !name || !subDesc) {
      return res.json({ success: false, message: "Fill all fields" });
    }

    let imageUrlList = [];

    // Upload each file to Cloudinary directly from memory
    for (const file of req.files) {
      try {
        let result = await uploadToCloudinary(file);
        imageUrlList.push(result.url);
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return res.json({ success: false, message: "Image upload failed" });
      }
    }

    const prodDoc = new prodModel({
      name,
      subDesc,
      brand,
      desc,
      stock,
      price,
      category,
      images: imageUrlList,
    });

    await prodDoc.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
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

      res
        .status(StatusCode.CREATED)
        .json({ success: true, message: "Product updated" });
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
    res.status(StatusCode.OK).json({
      success: true,
      message: `${
        product[0].isDeleted ? "Product Restored" : "Product Unlisted"
      }`,
    });
  } catch (error) {
    console.log("error while Unlisting product", error);
  }
};

exports.deleteImage = async (req, res) => {
  const { image, productId } = req.body;
  const filePath = path.join("uploads", image);

  try {
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
    } else {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ success: false, message: "File not found" });
    }

    await prodModel.updateOne({ _id: productId }, { $pull: { images: image } });
    res
      .status(StatusCode.OK)
      .json({ success: true, message: "image deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCode.NOT_FOUND)
      .json({ success: false, message: "Backend error in deleting image" });
  }
};

exports.get = async (req, res) => {
  const { category } = req.body;
  let data;
  const products = await prodModel.find({ name: "nn" });
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

exports.applyProductOffer = async (req, res) => {
  const { productId, discountedPrice } = req.body;

  try {
    const product = await prodModel.findOne({ _id: productId });

    if (!product?.categoryWiseOffer) {
      await prodModel.updateOne(
        { _id: productId },
        {
          $set: {
            discountPrice: Math.floor(discountedPrice),
            productWiseOffer: true,
          },
        }
      );
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "Offer Applied" });
    } else {
      return res.json({
        success: false,
        message: "already applied category offer",
      });
    }
  } catch (error) {
    console.log("error while applying offer", error);
    return res.json({ success: false, message: "error while applying offer" });
  }
};

exports.cancelProductOffer = async (req, res) => {
  const { productId } = req.body;

  const product = await prodModel.findOne({ _id: productId });
  const category = await categoryModel.findOne({ name: product?.category });

  try {
    if (category?.offerInPercentage > 0) {
      await prodModel.updateOne(
        { _id: productId },
        {
          $set: {
            discountPrice:
              product?.price -
              (product?.price * category?.offerInPercentage) / 100,
            productWiseOffer: false,
            categoryWiseOffer: true,
          },
        }
      );
    } else {
      await prodModel.updateOne(
        { _id: productId },
        {
          $set: {
            discountPrice: 0,
            productWiseOffer: false,
          },
        }
      );
    }
    return res.json({ success: true, message: "Product Offer Withdrawn" });
  } catch (error) {
    console.log("error while cancelling productOffer", error);
    return res.json({ success: false, message: "ProductOffer not cancelled" });
  }
};
