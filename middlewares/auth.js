import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next)=>{
    const {loggedIn} = req.cookies;
    if(!loggedIn){
      res.status(500).json({
        success:false,
        message:"Log in first!"
      })
    }else{
    const user = jwt.verify(loggedIn,process.env.SECRET);
    req.user = await User.findById(user._id);
    next();
    }
  }