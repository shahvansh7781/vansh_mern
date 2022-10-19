import User from "../../models/userModel";

const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  try {
    const userToken = req.body;
    // const myUserToken = JSON.parse(userToken);
    // console.log(userToken.token);
    const ujson = jwt.verify(userToken.token, process.env.JWT_SECRET);
    if(!ujson){
      res.status(500).json({
        success:false,
        error:"Unauthenticated"
      })
    }

    const user = await User.findOne({_id:ujson.userId})
    res.status(200).json({
      success:true,
      user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
