import connectDB from "../../config/database";
import User from "../../models/userModel";

const express = require("express");
const app = express();
app.use(express.json());

connectDB();

export default function handler(req, res) {
 User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  res.status(200).json({
    status: "ok",
  });
}
