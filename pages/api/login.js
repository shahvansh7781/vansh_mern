import connectDB from "../../config/database";
import User from "../../models/userModel";

connectDB();
export default async function handler(req, res) {
  try {
    let user = await User.findOne({email:req.body.email});
    if (!user || user.password != req.body.password) {
      res.status(500).json({
        success: false,
        error: "Invalid Credentials",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully Logged in!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
