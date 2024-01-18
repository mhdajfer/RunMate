const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderControllers");

router.post("/add", (req, res) => {
  orderController.add(req, res);
});

router.post("/create", (req, res) => {
  orderController.create(req, res);
});

router.post("/validatePayment", (req, res) => {
  orderController.validatePayment(req, res);
});

router.get("/getKey", (req, res) => {
  orderController.getKey(req, res);
});

router.get("/get-AllOrders", (req, res) => {
  orderController.getAllOrders(req, res);
});

router.get("/details/:id", (req, res) => {
  orderController.getOrderDetails(req, res);
});

router.post("/status/change", (req, res) => {
  orderController.changeStatus(req, res);
});
module.exports = router;
