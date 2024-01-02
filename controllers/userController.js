import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorSend from "../utils/ErrorSend.js";

export const registerUser = async(req,res,next)=>{
    const {name,email,password} = req.body;
    try {
      const foundUser = await User.findOne({email});
      if(!foundUser){
      const encrypted = await bcrypt.hash(password,10);
      const newUser = await User.create({name,email,password:encrypted});
      sendCookie(newUser,res,201,"User registerd successfully");
      }else next(new ErrorSend(403,"User already exists"));
    } catch (error) {
      next(error);
    }
  }

export const loginUser = async(req,res,next)=>{
    try {
      const {email,password} = req.body;
      const foundUser = await User.findOne({email});
      if(foundUser){
        const authenticated = await bcrypt.compare(password,foundUser.password);
        if(authenticated){
          sendCookie(foundUser,res,200,"User logged in successfully")
        }else next(new ErrorSend(403,"Incorrect Password"));
      }else next(new ErrorSend(403,"No user found, please register first"));
    } catch (error) {
      next(error);
    }
  }

export const logoutUser = async(req,res,next)=>{
    try {
      res
      .status(200)
      .cookie("loggedIn",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.ACCESS_MODE==="Development"?"lax":"none",
        secure:process.env.ACCESS_MODE==="Development"?false:true,
      })
      .json({success:true,message:"User is logged out."});
      req.user = {};
    } catch (error) {
     next(error);
    }
  }