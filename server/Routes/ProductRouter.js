const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productControllers");

router.post("/add", (req, res) => {
  productController.addProduct(req, res);
});

router.post("/get", (req, res) => {
  console.log("get route called");
  productController.get(req, res);
});

module.exports = router;
