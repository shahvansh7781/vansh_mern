import cookie from "cookie"

export default function handler(req,res){
res.setHeader("Set-Cookie",cookie.serialize("token","",{httpOnly:true,expires:new Date(0),sameSite:"strict",path:"/"}))
res.status(200).json({
    success:true,
    message:"Successfully Logged Out!"
})
}