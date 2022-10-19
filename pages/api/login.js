import passport from "passport";
import connectDB from "../../config/database";
import passportAuth from "../../middleware/passportAuth";
import passportSession from "../../middleware/passportSession";
import User from "../../models/userModel";
const jwt = require("jsonwebtoken");
import cookie from "cookie";
// passportSession();

passportAuth();
connectDB();

export default function handler(req, res) {
  try {
    passport.authenticate("local", function (err, user) {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
      } else {
        if (!user) {
          res
            .status(500)
            .json({ success: false, error: "Username or Password incorrect" });
        } else {
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
              firstName: user.firstName,
            },
            process.env.JWT_SECRET
          );
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              sameSite: "strict",
              path: "/",
              maxAge: 24 * 60 * 60 * 1000,
            })
          );
          res
            .status(200)
            .json({
              success: true,
              message: "Sucessfully Logged In",
              token: token,
            });
        }
      }
    })(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
