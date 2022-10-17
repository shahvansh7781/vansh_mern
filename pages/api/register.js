import connectDB from "../../config/database";
import User from "../../models/userModel";
const express = require("express");
const app = express();
app.use(express.json());


connectDB();

export default async function handler(req, res) {
  try {
    let user = new User(
    //   {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   phoneNumber: req.body.phoneNumber,
    //   email: req.body.email,
    //   password: req.body.password,
    //   confirmPassword: req.body.confirmPassword,
    // }
    req.body
    );
   await user.save();
    res.status(200).json({
      success: true,
      user,
      message:"Registered Successfully!"
    });
  } catch (err) {
    res.status(500).json({
      success:false,
      error:err.message
    })
  }
}
