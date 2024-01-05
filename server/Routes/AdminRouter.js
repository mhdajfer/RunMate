const adminController = require("../Controllers/adminControllers");
const categoryController = require("../Controllers/categoryControllers");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  adminController.login(req, res);
});

router.get("/orders", (req, res) => {
  adminController.getOrders(req, res);
});

router.post("/signup", (req, res) => {
  adminController.signup(req, res);
});

router.post("/block-user", (req, res) => {
  adminController.blockUser(req, res);
});

router.post("/verify-admin", (req, res) => {
  adminController.verify(req, res);
});
router.get("/logout", (req, res) => {
  adminController.logout(req, res);
});

router.get("/category", (req, res) => {
  categoryController.listCategory(req, res);
});

router.post("/category/add", (req, res) => {
  categoryController.addCategory(req, res);
});

router.post("/category/delete", (req, res) => {
  categoryController.delete(req, res);
});

module.exports = router;
