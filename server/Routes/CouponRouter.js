const express = require("express");
const router = express.Router();
const couponController = require("../Controllers/couponController");
const { isAdminLoggedIn, isUserLoggedIn } = require("../Middlewares/Auth");

router.post("/add", isAdminLoggedIn, (req, res) => {
  couponController.addCoupon(req, res);
});

router.get("/getCoupons", isUserLoggedIn, (req, res) => {
  couponController.getCoupons(req, res);
});
router.get("/getCoupons-admin", isAdminLoggedIn, (req, res) => {
  couponController.getCoupons(req, res);
});

router.post("/delete", isAdminLoggedIn, (req, res) => {
  couponController.deleteCoupon(req, res);
});

module.exports = router;
