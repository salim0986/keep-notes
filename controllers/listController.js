import { List } from "../models/listModel.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorSend from "../utils/ErrorSend.js";

export const getAllLists =  async (req, res,next) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const choosenUser = await currentUser.populate({
      path:"todolists",
    });
    res.status(200).json({
      success:true,
      lists:choosenUser.todolists
    });
  } catch (error) {
    next(error)
  }
    
  };

export const addList =  async (req, res,next) => {
    try {
      const foundList = await List.findOne({name:req.body.name});
      const {loggedIn} = req.cookies;
      const userId = jwt.verify(loggedIn,process.env.SECRET);
      const currentUser = await User.findById(userId._id);
      if(!foundList || !(foundList.owner==currentUser.name)){
      const newList =  await List.create({ name: req.body.name,owner:currentUser.name });

      await User.findByIdAndUpdate(
        currentUser._id,
        { $push: { "todolists": newList._id  } }
      );
      res.status(200).json({
        success:true,
        list:newList,
      })
      }else{
        next(new ErrorSend(403,`You have a list named "${foundList.name}" already!`))
      }
    } catch (error) {
      next(error);
    }
  };

export const getTasks = async (req, res,next) => {
    const { listName } = req.params;
    const chosenList = await List.find({ name: listName,owner:req.user.name }).populate({
      path: "todos",
    });
    if(chosenList[0]){
      try {
        res.status(200).json({
          success:true,
          tasks:chosenList[0].todos ,
        })
      } catch (error) {
        next(error)
      }
  }else return next(new ErrorSend(404,`You haven't created a list named "${listName}"`))
  };