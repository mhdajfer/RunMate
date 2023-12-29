const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderControllers");

router.post("/add", (req, res) => {
  orderController.add(req, res);
});

module.exports = router;
