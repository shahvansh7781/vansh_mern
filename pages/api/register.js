import connectDB from "../../config/database";
import passportAuth from "../../middleware/passportAuth";
import User from "../../models/userModel";
const validator = require("validator");
const express = require("express");
const app = express();
app.use(express.json());

passportAuth();
connectDB();

export default async function handler(req, res) {
  const userExists = await User.findOne({ username: req.body.username });
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
  });
  try {
    if (userExists) {
      res.status(500).json({
        success: false,
        error: "User already exists",
      });
    } else if (req.body.password != req.body.confirmPassword) {
      res.status(500).json({
        success: false,
        error: "Password and Confirm Password Must Match",
      });
    } else {
      if (!validator.isEmail(req.body.username)) {
        res.status(500).json({
          success: false,
          error: "Invalid Email Address",
        });
      } else {
        User.register(
          user,
          req.body.password,
          function (err, user1) {
            if (err) {
              // console.log(err);
              res.status(500).json({
                success: false,
                error: err.message,
              });
            }
            res.status(200).json({
              success: true,
              user1,
              message: "Registered Successfully",
            });
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
