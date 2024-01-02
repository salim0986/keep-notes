import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner:{type:String},
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  });

export const List = mongoose.model("Todolist", listSchema);
