const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userController = require("./Controllers/userControllers.js");
const userRouter = require("./Routes/UserRouter.js");
const adminRouter = require("./Routes/AdminRouter.js");

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

mongoose
  .connect("mongodb://127.0.0.1:27017/RunMateDB")
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("connection error: " + err);
  });
function hai() {
  console.log("hai");
}
//Routes
app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
