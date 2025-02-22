const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/UserRouter.js");
const adminRouter = require("./Routes/AdminRouter.js");
const productRouter = require("./Routes/ProductRouter.js");
const orderRouter = require("./Routes/OrderRouter.js");
const couponRouter = require("./Routes/CouponRouter.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

app.use(
  cors({
    origin: ["https://www.runmate.mhdajfer.in", "https://runmate.mhdajfer.in"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));

mongoose
  .connect(
    "mongodb+srv://ajferaju9961:Achuaju6@cluster.p3idumj.mongodb.net/RunMateDB"
  )
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("connection error: " + err);
  });

// app.post("/product/get", (req, res) => {
//   console.log("request is  here");
// });
//Routes
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);
app.use("/api/coupon/", couponRouter);
app.use("/api/", userRouter);

app.listen(port, () => {
  console.log("listening on port 3000");
});
