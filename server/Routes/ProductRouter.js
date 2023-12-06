const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productControllers");

router.post("/add", (req, res) => {
  productController.addProduct(req, res);
});

router.post("/get", (req, res) => {
  console.log("here");
  productController.get(req, res);
});

module.exports = router;
