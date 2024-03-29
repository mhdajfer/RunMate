const bannerModel = require("../models/banner");
const upload = require("../multer");
const uploadToCloudinary = require("../Utils/CloudinaryUpload");

exports.addBanner = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }

      const filepath = "uploads/" + req.file?.filename;
      const { caption, url } = req.body;

      const existBanner = await bannerModel.findOne({ caption: caption });
      if (existBanner)
        return res.json({
          success: false,
          message: "Banner exists with that caption",
        });

      let result = await uploadToCloudinary(filepath);

      const bannerDoc = new bannerModel({
        image: result.url,
        caption,
        url,
      });

      await bannerDoc.save();
      return res.status(200).json({ success: true, message: "Banner Added" });
    });
  } catch (error) {
    console.log("error while adding banner", error);
  }
};

exports.getBannerList = async (req, res) => {
  try {
    const bannerList = await bannerModel.find({});
    return res.status(200).json({ success: true, data: bannerList });
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
    return res.status(200).json({ success: true, message: "Banner deleted." });
  } catch (error) {
    console.log("error while deleting banner", error);
    return res.json({ success: false, message: "error while deleting banner" });
  }
};
