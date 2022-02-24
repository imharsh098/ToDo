import axios from "axios";
import {
  TASKS_FAIL,
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASK_ADD_REQUEST,
  TASK_ADD_FAIL,
  TASK_ADD_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DONE_REQUEST,
  TASK_DONE_SUCCESS,
  TASK_DONE_FAIL,
  REMOVE_ERROR,
} from "../types";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : "";
export const listTasks = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TASKS_REQUEST,
    });
    const { data } = await axios.get(`/api/todos/${id}`);
    dispatch({
      type: TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: TASKS_FAIL, payload: error.response.data.msg });
  }
};

export const removeError = () => (dispatch) => {
  dispatch({ type: REMOVE_ERROR });
};
export const addTask = (newTask) => async (dispatch) => {
  try {
    dispatch({ type: TASK_ADD_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-key": userInfo.token,
      },
    };
    const { data } = await axios.post(`/api/todos/add`, newTask, config);
    dispatch({ type: TASK_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_ADD_FAIL,
      payload: error.response.data.errors[0].msg,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERROR,
      });
    }, 7000);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-key": userInfo.token,
      },
    };
    const { data } = await axios.delete(`/api/todos/delete/${id}`, config);
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error.response.data.errors[0].msg,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERROR,
      });
    }, 7000);
  }
};

export const checkTask = (id, content) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DONE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-key": userInfo.token,
      },
    };
    const { data } = await axios.put(`/api/todos/edit/${id}`, content, config);
    if (data.msg) {
      dispatch({ type: TASK_DONE_FAIL, payload: data.msg });
    }
    if (!data.msg) {
      dispatch({ type: TASK_DONE_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: TASK_DONE_FAIL,
      payload: error.response.data.errors[0].msg,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_ERROR,
      });
    }, 7000);
  }
};
