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

router.post("/verify-user", (req, res) => {
  userController.verify(req, res);
});

router.get("/logout", (req, res) => {
  userController.logout(req, res);
});

router.post("/images", (req, res) => {
  userController.addImage(req, res);
});

router.post("/cart/add", (req, res) => {
  cartController.add(req, res);
});

module.exports = router;
