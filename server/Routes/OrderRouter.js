const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderControllers");
const { isUserLoggedIn, isAdminLoggedIn } = require("../Middlewares/Auth");

router.post("/add", isUserLoggedIn, (req, res) => {
  orderController.add(req, res);
});

router.post("/create", isUserLoggedIn, (req, res) => {
  orderController.create(req, res);
});

router.post("/validatePayment", isUserLoggedIn, (req, res) => {
  orderController.validatePayment(req, res);
});

router.get("/getKey", isUserLoggedIn, (req, res) => {
  orderController.getKey(req, res);
});

router.post("/add-wallet", isUserLoggedIn, (req, res) => {
  orderController.addOrderforWallet(req, res);
});

router.get("/getAll", isAdminLoggedIn, (req, res) => {
  orderController.getAllOrders(req, res);
});

router.post("/get-AllOrders", isUserLoggedIn, (req, res) => {
  orderController.getUserOrders(req, res);
});

router.get("/details/:id", (req, res) => {
  orderController.getOrderDetails(req, res);
});
// router.get(
//   "/details/:id/admin",
//   isAdminLoggedIn,
//   isUserLoggedIn,

//   (req, res) => {
//     orderController.getOrderDetails(req, res);
//   }
// );

router.post("/status/change", (req, res) => {
  orderController.changeStatus(req, res);
});
module.exports = router;
