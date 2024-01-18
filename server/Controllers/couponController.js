const couponModel = require("../models/coupon");

exports.addCoupon = async (req, res) => {
  const { name, desc, code, discount } = req.body;

  try {
    const couponDoc = new couponModel({
      name,
      desc,
      code,
      discount,
    });
    await couponDoc.save();
    return res.json({ success: true, message: "coupon added successfully" });
  } catch (error) {
    console.log("error while adding coupon", error);
    return res.json({ success: false, message: "coupon not added" });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const data = await couponModel.find({});
    return res.json({ success: true, data: data });
  } catch (error) {
    console.log("error while getting coupons: ", error);
    return res.json({ success: false });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { coupon } = req.body;
  try {
    await couponModel.deleteOne({ _id: coupon._id });
    return res.json({ success: true, message: "coupon deleted" });
  } catch (error) {
    console.log("error while deleting coupon", error);
    return res.json({ success: false, message: "Error while deleting coupon" });
  }
};
