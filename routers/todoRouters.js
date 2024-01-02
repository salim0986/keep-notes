import { Router } from "express";
import { addTask, removeTask, toUpdate, updateTask } from "../controllers/todoController.js";



const todoRouter = Router();

todoRouter.post("/tasks/add/:listName", addTask);
  
todoRouter.post("/tasks/remove/:id", removeTask);
todoRouter.post("/tasks/toupdate/:id", toUpdate);
  
todoRouter.post("/tasks/update/:id", updateTask);

export default todoRouter;