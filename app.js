import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { mongoDbConnect } from "./data/database.js";
import userRouter from "./routers/userRouters.js";
import listRouter from "./routers/listRouters.js";
import todoRouter from "./routers/todoRouters.js";
import errorHandler from "./middlewares/error.js";
import cors from "cors";

//app
export const app = express();

//middlewares
app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1",userRouter);
app.use("/api/v1",listRouter);
app.use("/api/v1",todoRouter);
app.use(errorHandler);

//config
dotenv.config({
  path:"./config.env"
})

//--------------database connection-----------
mongoDbConnect();
