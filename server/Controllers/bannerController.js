const bannerModel = require("../models/banner");
const uploadToCloudinary = require("../Utils/CloudinaryUpload");
const StatusCode = require("../Utils/StatusCode");

exports.addBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No image uploaded" });
    }

    console.log("File details:", {
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer ? "Buffer exists" : "No buffer",
    });

    const { caption, url } = req.body;
    if (!caption || !url) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existBanner = await bannerModel.findOne({ caption: caption });
    if (existBanner) {
      return res.json({
        success: false,
        message: "Banner exists with that caption",
      });
    }

    try {
      const imageUrlList = [];
      const result = await uploadToCloudinary(req.file);
      imageUrlList.push(result.url);

      const bannerDoc = new bannerModel({
        image: imageUrlList[0],
        caption,
        url,
      });

      await bannerDoc.save();
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "Banner Added" });
    } catch (uploadError) {
      console.log("Cloudinary upload error:", uploadError);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error uploading image",
      });
    }
  } catch (error) {
    console.log("error while adding banner", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while adding banner",
    });
  }
};

exports.getBannerList = async (req, res) => {
  try {
    const bannerList = await bannerModel.find({});
    return res.status(StatusCode.OK).json({ success: true, data: bannerList });
  } catch (error) {
    console.log("error while getting banner list", error);
    return res.json({
      success: false,
      message: "error while getting banner list",
    });
  }
};

exports.deleteBanner = async (req, res) => {
  const { banner } = req.body;
  try {
    await bannerModel.deleteOne({ _id: banner._id });
    return res
      .status(StatusCode.OK)
      .json({ success: true, message: "Banner deleted." });
  } catch (error) {
    console.log("error while deleting banner", error);
    return res.json({ success: false, message: "error while deleting banner" });
  }
};
