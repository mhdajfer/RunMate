const userController = require("../Controllers/userControllers");
const cartController = require("../Controllers/cartControllers");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/user/edit", (req, res) => {
  userController.edit(req, res);
});

router.get("/users/delete/:id", (req, res) => {
  userController.delete(req, res);
});

router.post("/user/signup", (req, res) => {
  userController.signUp(req, res);
});

router.get("/users", (req, res) => {
  userController.getUsers(req, res);
});

router.post("/user/getAddress", (req, res) => {
  userController.getAddress(req, res);
});

router.post("/user/address/add", (req, res) => {
  userController.addAddress(req, res);
});

router.post("/user/address/delete", (req, res) => {
  userController.deleteAddress(req, res);
});

router.post("/user/address/edit", (req, res) => {
  userController.editAddress(req, res);
});

router.post("/user/password/change", (req, res) => {
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

router.post("/getOneUser", (req, res) => {
  userController.getOneUser(req, res);
});

router.post("/images", (req, res) => {
  userController.addImage(req, res);
});

router.post("/cart/add", (req, res) => {
  cartController.add(req, res);
});

router.post("/cart/get", (req, res) => {
  cartController.get(req, res);
});

router.post("/cart/remove", (req, res) => {
  cartController.remove(req, res);
});

router.post("/cart/stock-check", (req, res) => {
  cartController.stockCheck(req, res);
});

router.post("/getAllAddress", (req, res) => {
  userController.getAllAddress(req, res);
});

router.post("/isUserBlocked", (req, res) => {
  userController.isUserBlocked(req, res);
});

module.exports = router;
