const adminController = require("../Controllers/adminControllers");
const categoryController = require("../Controllers/categoryControllers");
const bannerController = require("../Controllers/bannerController");
const express = require("express");
const router = express.Router();
const { isAdminLoggedIn } = require("../Middlewares/Auth");

router.post("/login", (req, res) => {
  adminController.login(req, res);
});

router.get("/orders", isAdminLoggedIn, (req, res) => {
  adminController.getOrders(req, res);
});

router.post("/signup", (req, res) => {
  adminController.signup(req, res);
});

router.post("/block-user", isAdminLoggedIn, (req, res) => {
  adminController.blockUser(req, res);
});

router.post("/verify-admin", (req, res) => {
  adminController.verify(req, res);
});
router.get("/logout", (req, res) => {
  adminController.logout(req, res);
});

router.get("/category", isAdminLoggedIn, (req, res) => {
  categoryController.listCategory(req, res);
});

router.post("/category/add", isAdminLoggedIn, (req, res) => {
  categoryController.addCategory(req, res);
});

router.post("/category/delete", isAdminLoggedIn, (req, res) => {
  categoryController.delete(req, res);
});

router.post("/category/applyOffer", isAdminLoggedIn, (req, res) => {
  categoryController.applyOffer(req, res);
});

router.post("/category/cancelOffer", isAdminLoggedIn, (req, res) => {
  categoryController.cancelOffer(req, res);
});

router.post("/banner/add", (req, res) => {
  bannerController.addBanner(req, res);
});

router.get("/getBannerList", (req, res) => {
  bannerController.getBannerList(req, res);
});

router.post("/delete-banner", (req, res) => {
  bannerController.deleteBanner(req, res);
});

router.post("/isUserBlocked", (req, res) => {
  adminController.isUserBlocked(req, res);
});

module.exports = router;
