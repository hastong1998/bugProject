import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../../services/UserService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  HANDLE_USER_API,
  UPDATE_USER_SAGA,
} from "../../constans/Cyberbugs/UserConst";

function* getAllUser(action) {
  const { keyWord } = action;

  try {
    const { data, status } = yield call(() => userService.getAllUser(keyWord));
    yield put({
      type: GET_ALL_USER,
      listUser: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetAllUser() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUser);
}
function* deleteUser(action) {
  const { id } = action;

  try {
    yield call(() => userService.deleteUser(id));
    yield put({
      type: GET_ALL_USER_SAGA,
      keyWord: "",
    });
    openNotificationWithIcon("success", "User has been deleted!");
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "error");
  }
}
export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUser);
}

function* updateUser(action) {
  const { values } = action;

  try {
    yield call(() => userService.updateUser(values));
    // yield put({
    //   type: GET_ALL_USER_SAGA,
    //   keyWord: "",
    // });
    openNotificationWithIcon("success", "User has been updated!");
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "error");
  }
}
export function* theoDoiUpdateUser() {
  yield takeLatest(UPDATE_USER_SAGA, updateUser);
}
function* handleUserApi(action) {
  switch (action.actionType) {
    case UPDATE_USER_SAGA: {
      const { values } = action;
      yield put({
        type: UPDATE_USER_SAGA,
        values,
      });
      break;
    }

    case DELETE_USER_SAGA: {
      const { id } = action;
      yield put({
        type: DELETE_USER_SAGA,
        id,
      });
      break;
    }
  }
  yield put({
    type: GET_ALL_USER_SAGA,
    keyWord: "",
  });
}
export function* theoDoiHandleUserApi() {
  yield takeLatest(HANDLE_USER_API, handleUserApi);
}
