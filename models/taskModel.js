import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    listName:String,
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    updating: {
      type: Boolean,
      default: false,
    },
  });

export const ToDo = mongoose.model("Todo", todoSchema);
