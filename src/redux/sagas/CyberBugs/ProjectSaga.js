import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbygsService } from "../../../services/CyberbugsService";
import { porjectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_SAGA,
  USER_SIGNIN_API,
} from "../../constans/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECTID_SAGA } from "../../constans/Cyberbugs/UserConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constans/LoadingConst";

function* createProjectSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      cyberbygsService.createProjectAuthorization(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

function* getListProjectSaga() {
  try {
    const { data, status } = yield call(() =>
      cyberbygsService.getListProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_LIST",
        projectList: data.content,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

function* updateProjectSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      cyberbygsService.updateProject(action.projectUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

function* deleteProjectSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      porjectService.deleteProject(action.id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Delete Project is success!");
    } else {
      openNotificationWithIcon("error", "Delete Project is fail!");
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "Delete Project is fail!");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
  try {
    const { data, status } = yield call(() =>
      porjectService.getProjectDetail(action.projectId)
    );
    yield put({
      type: "PUT_PROJECT_DETAIL",
      projectDetail: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetDetailProjectSaga() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}

function* getAllProjectDetailSaga(action) {
  try {
    const { data, status } = yield call(() => porjectService.getAllProject());

    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectDetailSaga);
}
