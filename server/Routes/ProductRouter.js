const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productControllers");

router.get("/", (req, res) => {
  productController.allProducts(req, res);
});
router.post("/add", (req, res) => {
  productController.addProduct(req, res);
});

router.post("/get", (req, res) => {
  productController.get(req, res);
});

router.post('/edit', (req, res) => {
  productController.edit(req, res);
})

router.get('/delete/:id', (req, res) => {
  productController.delete(req, res);
})

module.exports = router;
