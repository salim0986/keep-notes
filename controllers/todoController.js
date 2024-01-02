import { ToDo } from "../models/taskModel.js";
import { List } from "../models/listModel.js";


export const addTask = async (req, res,next) => {
  try {
    const {listName} = req.params;
    const newTodo = await ToDo.create({...req.body,listName});
    await List.findOneAndUpdate(
      { name: listName },
      { $push: { "todos": newTodo._id  } }
    );
      res.status(200).json({
        success:true,
        task:newTodo,
      })
  } catch (error) {
    next(error)
  }
    
  }

export const removeTask = async (req, res,next) => {
    const { id } = req.params;
    try {
      const toDelete = await ToDo.findByIdAndDelete(id);
      res.status(200).json({
        success:true,
        deletedTask:toDelete,
      })
    } catch (error) {
      next(error)
    }
  };

export const toUpdate = async (req, res,next) => {
    const { id } = req.params;
    try {
     const toUpdate =  await ToDo.findByIdAndUpdate(id, { updating: true });
     res.status(200).json({
      success:true,
      taskToUpdate:toUpdate,
     })
    } catch (error) {
      next(error);
    }
  }

export const updateTask = async (req, res,next) => {
    const { id } = req.params;
    try {
     const updated = await ToDo.findByIdAndUpdate(id, { ...req.body, updating: false });
      res.status(200).json({
        success:true,
        updatedTask:updated,
      })
    } catch (error) {
      next(error);
    }
  }