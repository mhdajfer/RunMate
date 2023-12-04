const userController = require("../Controllers/userControllers");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/signup", (req, res) => {
  userController.signUp(req, res);
});

router.post("/verify-user", (req, res) => {
  userController.verify(req, res);
});

router.get("/logout", (req, res) => {
  userController.logout(req, res);
});

module.exports = router;
