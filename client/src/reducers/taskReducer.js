import {
  TASKS_FAIL,
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DONE_REQUEST,
  TASK_DONE_SUCCESS,
  TASK_DONE_FAIL,
  REMOVE_ERROR,
} from "../types";

export const tasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return { ...state, loading: true };
    case TASKS_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASKS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TASK_ADD_REQUEST:
      return { ...state, loading: true };
    case TASK_ADD_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TASK_DELETE_REQUEST:
      return { ...state, loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TASK_DONE_REQUEST:
      return { ...state, loading: true };
    case TASK_DONE_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_DONE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
