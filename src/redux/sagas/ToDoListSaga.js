import axios from "axios";
import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constans/LoadingConst";
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
} from "../constans/ToDoListConst";

function* getTaskApiAction(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let { data, status } = yield call(toDoListService.getTaskApi);
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("err");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

function* addTaskApiAction(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiActionAddTaskApiAction() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

function* deleteTaskApi(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

function* doneTaskApi(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.doneTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiActionDoneTaskApi() {
  yield takeLatest(CHECK_TASK_API, doneTaskApi);
}
