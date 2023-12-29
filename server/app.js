const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/UserRouter.js");
const adminRouter = require("./Routes/AdminRouter.js");
const productRouter = require("./Routes/ProductRouter.js");
const orderRouter = require("./Routes/OrderRouter.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/RunMateDB")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("connection error: " + err);
  });

//Routes
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log("listening on port 3000");
});
