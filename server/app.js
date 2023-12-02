const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userController = require("./Controllers/userControllers.js");

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

app.post("/login", (req, res) => {
  userController.login(req, res);
});

app.post("/signup", (req, res) => {
  userController.signUp(req, res);
});

app.post("/verify-user", (req, res) => {
  userController.verify(req, res);
});

app.get("/logout", (req, res) => {
  userController.logout(req, res);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
