import express from "express";

const app = express();
const port = 4000;

// import connect function
import "./connect.js";
// import routers
import userRouter from "./controllers/user/index.js";
import todoRouter from "./controllers/todos/index.js";
app.use(express.json());

app.use(express.static("build"));
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

app.listen(port, (req, res) => {
  console.log("Server started at port ", port);
});
