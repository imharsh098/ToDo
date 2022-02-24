import mongoose from "mongoose";

const Schema = mongoose.Schema;

let todoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      taskname: { type: String, required: true },
      deadline: { type: Date, required: true },
      isDone: { type: Boolean, default: false },
      reminder: { type: Array, required: true },
    },
  ],
});

const todoModel = new mongoose.model("Todo", todoSchema, "onlyTodos");

export default todoModel;
