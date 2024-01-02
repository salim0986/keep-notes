import jwt from "jsonwebtoken";
export const sendCookie = async (user,res,status,message)=>{
    const token =  jwt.sign({_id:user._id},process.env.SECRET);
    res.status(status)
    .cookie("loggedIn",token,{
            httpOnly:true,
            expires:new Date(Date.now() + 86400000),
            sameSite:process.env.ACCESS_MODE==="Development"?"lax":"none",
            secure:process.env.ACCESS_MODE==="Development"?false:true,
})
    .json({success:true,message,user});
}

