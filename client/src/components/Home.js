import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  listTasks,
  addTask,
  deleteTask,
  checkTask,
} from "../actions/taskActions";
import { logoutAction } from "../actions/userActions";
import Loading from "./Loading";

function Home() {
  const [state, setState] = useState({
    taskname: "",
    deadline: "",
  });

  const history = useNavigate();
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.taskData);
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const userInfo = userLogin["userInfo"]
    ? userLogin["userInfo"]
    : userRegister["userInfo"];
  const { tasks, loading, error } = taskData;
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const handleLogout = () => {
    dispatch(logoutAction());
    history("/login");
  };
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  const handleCheck = (id, content) => {
    dispatch(checkTask(id, content));
  };
  const formatDate = (date) => {
    const weeks = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = weeks[new Date(date).getDay() + 1];
    let dayOfMonth = new Date(date).getDate();
    let month = months[new Date(date).getMonth()];
    let hours = new Date(date).getHours();
    let mins = new Date(date).getMinutes();
    return { day, dayOfMonth, month, hours, mins };
  };
  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    if (userInfo) {
      dispatch(listTasks(userInfo._id));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let dt = new Date(`${state.deadline}`);
    dispatch(addTask({ taskname: state.taskname, deadline: dt }));
  };
  return (
    <>
      <div className="formBody">
        <form className="formCss" onSubmit={handleSubmit}>
          {error && <div className="taskerror">{error}</div>}
          <input
            type="text"
            name="todo"
            className="inputCss"
            id="taskname"
            placeholder="   +Enter a Task"
            value={state.taskname}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            id="deadline"
            className="deadlineCss"
            value={state.deadline}
            onChange={handleChange}
            required
          />

          <button className="btnCss" type="submit">
            <i className="fa fa-plus"></i>
          </button>
        </form>

        <ul className="listCss">
          {tasks.map((todo) => (
            <li key={todo._id} className="tasksCss">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {todo.isDone ? (
                    <strike className="taskname">{todo.taskname}</strike>
                  ) : (
                    <p className="taskname">{todo.taskname}</p>
                  )}
                  <p className="taskDate">
                    {formatDate(todo.deadline).day},{" "}
                    {formatDate(todo.deadline).dayOfMonth}
                    <sup>th</sup> {formatDate(todo.deadline).month}
                  </p>
                </div>

                <div className="iconStyle">
                  {" "}
                  <span className="del">
                    <i
                      className="fa fa-times"
                      style={{ color: "red" }}
                      onClick={() => {
                        handleDelete(todo._id);
                      }}
                    ></i>
                  </span>
                  <span className="done">
                    <i
                      className="fa fa-check"
                      style={{ color: "green" }}
                      onClick={() => {
                        handleCheck(todo._id, {
                          taskname: todo.taskname,
                          isDone: !todo.isDone,
                          deadline: todo.deadline,
                        });
                      }}
                    ></i>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="logoutBtn">
          <i
            className="fa fa-power-off fa-2x"
            style={{ width: "100%", height: "100%" }}
            onClick={handleLogout}
          ></i>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default Home;
