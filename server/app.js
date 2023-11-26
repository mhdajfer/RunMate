const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./Controllers/userControllers.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.listen(3000, () => {
  console.log("listening on port 3000");
});
