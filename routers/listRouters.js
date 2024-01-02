import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";

import { addList, getAllLists, getTasks } from "../controllers/listController.js";


const listRouter = Router();


  listRouter.get("/",isAuthenticated,getAllLists);
  
  listRouter.post("/list/add",addList);
  
  listRouter.get("/:listName",isAuthenticated,getTasks );
  

export default listRouter;