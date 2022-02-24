import express from "express";
import User from "../../models/User.js";
import Todo from "../../models/Todo.js";
import {
  reminderScheduler,
  cancelJobs,
} from "../../helpers/reminderScheduler.js";
const router = express.Router();
import {
  taskValidations,
  errorMiddleware,
} from "../../middlewares/validations/index.js";
import verifyToken from "../../middlewares/auth/index.js";

/*
    API EndPoint : /api/todos
    Method : GET
    Access Type : Private
    Validations : 
    Description : Get all todos of a user
*/
router.get("/:id", async (req, res) => {
  try {
    let user = await Todo.findOne({ user: req.params.id }); //using find by id is optimal
    res.status(200).json(user.todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/todos/todo/add
      Method : POST
      Payload : Request.Body - taskname,deadline,isDone, request.headers - access token
      Access Type : Public
      Validations : 

      Description :Add task
*/

router.post(
  "/add",
  taskValidations(),
  errorMiddleware,
  verifyToken,
  async (req, res) => {
    try {
      let todoData = await Todo.findOne({ user: req.user._id });
      if (!todoData) {
        return res.status(404).json({ msg: "User not found" });
      }
      let deadLine = new Date(req.body.deadline).getTime();
      let reminder1 = new Date(deadLine - 60000);
      let reminder2 = new Date(deadLine - 30000);
      req.body.reminder = [reminder1, reminder2];
      todoData.todos.push(req.body);
      // doing this after push to get taskId
      await todoData.save();

      reminderScheduler(req.user, todoData.todos[todoData.todos.length - 1]);

      res.status(200).json(todoData.todos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*
      API EndPoint : /edit/:todoid  
      Method : PUT
      Payload : Request.Body - taskname,deadline,isDone
      Access Type : Public
      Validations : if email exists then update task with the matching id
      Description :Update task
*/
router.put(
  "/edit/:todoid",
  taskValidations(),
  errorMiddleware,
  verifyToken,
  async (req, res) => {
    try {
      let todoData = await Todo.findOne({ user: req.user._id });
      if (!todoData) {
        return res.status(404).json({ msg: "Invalid token / User not found" });
      }
      const todoIndex = todoData.todos.findIndex(
        (task) => task._id == req.params.todoid
      );
      if (todoIndex == -1) {
        return res.status(404).json({ msg: "Todo not found" });
      }
      cancelJobs(todoData.todos[todoIndex]._id);

      if (req.body.deadline != todoData.todos[todoIndex].deadline) {
        let deadLine = new Date(req.body.deadline).getTime();
        let reminder1 = new Date(deadLine - 60000); //Meant to change after testing as we need reminders more than 30minutes
        let reminder2 = new Date(deadLine - 30000); //Meant to change after testing as we need reminders more than 30minutes
        req.body.reminder = [reminder1, reminder2];
      }

      todoData.todos[todoIndex] = {
        ...todoData.todos[todoIndex],
        ...req.body,
      };
      await todoData.save();
      reminderScheduler(req.user, todoData.todos[todoIndex]);

      res.status(200).json(todoData.todos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*
      API EndPoint : /delete/:email/:todoid
      Method : DELETE
      Payload : none
      Access Type : Private
      Validations : if email exists then delete task with the matching id
      Description :Delete task
*/
router.delete("/delete/:todoid", verifyToken, async (req, res) => {
  try {
    let todoData = await Todo.findOne({ user: req.user._id });
    if (!todoData) {
      return res.status(404).json({ msg: "Invalid user token" });
    }
    todoData.todos = todoData.todos.filter(
      (task) => task._id != req.params.todoid
    );
    await todoData.save();
    cancelJobs(req.params.todoid);
    res.status(200).json(todoData.todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /all
      Method : GET
      Payload : none
      Access Type : Public
      Validations : none
      Description :Get all todos with userInfo
*/

router.get("/all", async (req, res) => {
  try {
    let data = await Todo.find({}).populate("user", "-password");
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
});
export default router;
