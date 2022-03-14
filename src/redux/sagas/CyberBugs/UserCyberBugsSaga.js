import axios from "axios";

import {
  fork,
  take,
  takeEvery,
  delay,
  takeLatest,
  call,
  put,
  select,
} from "redux-saga/effects";
import { cyberbygsService } from "../../../services/CyberbugsService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { USER_SIGNIN_API, USLOGIN } from "../../constans/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constans/LoadingConst";
import { history } from "../../../util/libs/history";
import { userService } from "../../../services/UserService";
import {
  GET_USER_BY_PROJECTID,
  GET_USER_BY_PROJECTID_SAGA,
} from "../../constans/Cyberbugs/UserConst";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
function* signinSaga(action) {
  //   console.log(action);

  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      cyberbygsService.signinCyberBugs(action.userLogin)
    );
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });
    let history = yield select((state) => state.HistoryReducer.history);

    history.push("/projectManagement");
  } catch (error) {
    console.log(error.response?.data.message);
    openNotificationWithIcon("error", error.response?.data.message);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

function* getUserSaga(action) {
  //   console.log(action);
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );

    yield put({
      type: "GET_USER_SEARCH",
      lstUserSearch: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}
function* addUserProjectSaga(action) {
  //   console.log(action);
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    openNotificationWithIcon("success", "add member success!");
  } catch (error) {
    console.log(error);
    openNotificationWithIcon(
      "error",
      "your account doesn't have permissions to make changes!!!"
    );
  }
}
export function* theoDoiAddUserProjectSaga() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
  //   console.log(action);
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    openNotificationWithIcon("success", "remove member success!");
  } catch (error) {
    openNotificationWithIcon(
      "error",
      "your account doesn't have permissions to make changes!!!!"
    );
    console.log(error);
  }
}
export function* theoDoiRemoveUserProjectSaga() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}
function* getUserByProjectIdSaga(action) {
  const idProject = action.idProject;

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECTID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.reponse?.data);
  }
}
export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECTID_SAGA, getUserByProjectIdSaga);
}
