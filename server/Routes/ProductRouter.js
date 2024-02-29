const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productControllers");
const { isAdminLoggedIn, isUserLoggedIn } = require("../Middlewares/Auth");

router.get("/", (req, res) => {
  productController.allProducts(req, res);
});

router.get("/forAdmin", (req, res) => {
  productController.allProductsForAdmin(req, res);
});
router.post("/add", isAdminLoggedIn, (req, res) => {
  productController.addProduct(req, res);
});

router.post("/get", (req, res) => {
  productController.get(req, res);
});

router.post("/getOneProduct", (req, res) => {
  productController.getOneProduct(req, res);
});

router.post("/image/delete", isAdminLoggedIn, (req, res) => {
  productController.deleteImage(req, res);
});

router.post("/edit", (req, res) => {
  productController.edit(req, res);
});

router.get("/delete/:id", (req, res) => {
  productController.delete(req, res);
});

router.get("/restore/:id", (req, res) => {
  productController.restore(req, res);
});

router.post("/applyOffer", isAdminLoggedIn, (req, res) => {
  productController.applyProductOffer(req, res);
});

router.post("/cancelOffer", isAdminLoggedIn, (req, res) => {
  productController.cancelProductOffer(req, res);
});

module.exports = router;
