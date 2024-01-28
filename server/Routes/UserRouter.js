const userController = require("../Controllers/userControllers");
const cartController = require("../Controllers/cartControllers");
const walletController = require("../Controllers/walletController");
const categoryController = require("../Controllers/categoryControllers");
const express = require("express");
const router = express.Router();
const { isUserLoggedIn, isAdminLoggedIn } = require("../Middlewares/Auth");

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/user/edit", isUserLoggedIn, (req, res) => {
  userController.edit(req, res);
});

router.get("/users/delete/:id", isAdminLoggedIn, (req, res) => {
  userController.delete(req, res);
});
router.get("/users/restore/:id", isAdminLoggedIn, (req, res) => {
  userController.restore(req, res);
});

router.post("/user/signup", (req, res) => {
  userController.signUp(req, res);
});

router.get("/users", isAdminLoggedIn, (req, res) => {
  userController.getUsers(req, res);
});

router.post("/user/getAddress", isUserLoggedIn, (req, res) => {
  userController.getAddress(req, res);
});

router.post("/user/address/add", isUserLoggedIn, (req, res) => {
  userController.addAddress(req, res);
});

router.post("/user/address/delete", isUserLoggedIn, (req, res) => {
  userController.deleteAddress(req, res);
});

router.post("/user/address/edit", isUserLoggedIn, (req, res) => {
  userController.editAddress(req, res);
});

router.post("/user/password/change", isUserLoggedIn, (req, res) => {
  userController.changePassword(req, res);
});

router.get("/user/activate/:token", (req, res) => {
  userController.activate(req, res);
});

router.post("/verify-user", (req, res) => {
  userController.verify(req, res);
});

router.get("/logout", (req, res) => {
  userController.logout(req, res);
});

router.post("/getOneUser", isUserLoggedIn, (req, res) => {
  userController.getOneUser(req, res);
});

router.post("/cart/add", (req, res) => {
  cartController.add(req, res);
});

router.post("/cart/get", isUserLoggedIn, (req, res) => {
  cartController.get(req, res);
});

router.post("/cart/remove", (req, res) => {
  cartController.remove(req, res);
});

router.post("/cart/stock-check", (req, res) => {
  cartController.stockCheck(req, res);
});

router.post("/getAllAddress", isUserLoggedIn, (req, res) => {
  userController.getAllAddress(req, res);
});

router.post("/isUserBlocked", isUserLoggedIn, (req, res) => {
  userController.isUserBlocked(req, res);
});

//wallet Routes
router.post("/wallet/add", isUserLoggedIn, (req, res) => {
  walletController.addMoney(req, res);
});

router.post("/wallet/balance", isUserLoggedIn, (req, res) => {
  walletController.getBalance(req, res);
});

router.post("/wallet/deduct", isUserLoggedIn, (req, res) => {
  walletController.getDeducted(req, res);
});

router.get("/category", isUserLoggedIn, (req, res) => {
  categoryController.listCategory(req, res);
});

module.exports = router;
