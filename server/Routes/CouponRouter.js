const express = require("express");
const router = express.Router();
const couponController = require("../Controllers/couponController");

router.post("/add", (req, res) => {
  couponController.addCoupon(req, res);
});

router.get("/getCoupons", (req, res) => {
  couponController.getCoupons(req, res);
});

router.post("/delete", (req, res) => {
  couponController.deleteCoupon(req, res);
});

module.exports = router;
