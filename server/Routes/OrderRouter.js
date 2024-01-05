const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderControllers");

router.post("/add", (req, res) => {
  orderController.add(req, res);
});

router.get("/get-AllOrders", (req, res) => {
  orderController.getAllOrders(req, res);
});
module.exports = router;
