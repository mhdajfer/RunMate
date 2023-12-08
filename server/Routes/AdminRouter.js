const adminController = require("../Controllers/adminControllers");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  adminController.login(req, res);
});

router.post("/signup", (req, res) => {
  adminController.signup(req, res);
});

router.post('/block-user', (req, res) => {
  adminController.blockUser(req, res);
})

router.post("/verify-admin", (req, res) => {
  adminController.verify(req, res);
});

module.exports = router;
