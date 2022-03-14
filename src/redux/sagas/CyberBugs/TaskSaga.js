import { useSelector } from "react-redux";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_SAGA,
  INSERT_COMMENT,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../../constans/Cyberbugs/TaskConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constans/LoadingConst";

function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    yield put({
      type: "CLOSE_DRAWER",
    });
    openNotificationWithIcon("success", "Create task success!");
  } catch (error) {
    openNotificationWithIcon("error", "Create task error!");
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
function* getTaskDetailSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );
    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetTaskDetailSaga(action) {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}
function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  console.log(taskUpdateStatus);
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskUpdate(taskUpdateStatus)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateStatus.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* updataTaskSaga(action) {}
export function* theoDoiUpdataTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updataTaskSaga);
}

export function* handleChangePostApi(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;

        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    case "REMOVE_USER_ASSIGN":
      {
        const { userId } = action;
        yield put({
          type: "REMOVE_USER_ASSIGN",
          userId,
        });
      }
      break;
    case INSERT_COMMENT_SAGA: {
      const { comment } = action;
      yield put({
        type: INSERT_COMMENT_SAGA,
        comment: comment,
      });
      break;
    }
    case DELETE_COMMENT_SAGA: {
      const { id, taskId } = action;
      yield put({
        type: DELETE_COMMENT_SAGA,
        id,
        taskId,
      });
      break;
    }
    case UPDATE_COMMENT_SAGA: {
      const { contentComment, id, taskId } = action;
      yield put({
        type: UPDATE_COMMENT_SAGA,
        contentComment,
        id,
        taskId,
      });
      break;
    }
  }
  let { taskDetailModal } = yield select((state) => state.TaskDetailModel);

  // let { taskDetailModal } = yield select((state) => state.TaskDetailModel);
  // // let { taskDetailModal } = yield select((state) => state.TaskReducer);
  // console.log("taskDetailModal sau khi thay đổi", taskDetailModal);
  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  taskDetailModal = { ...taskDetailModal, listUserAsign };

  // const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
  //   return user.id;
  // });
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskDetailModal)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskDetailModal.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskDetailModal.taskId,
      });
    }
  } catch (err) {
    console.log(err);
  }
  // const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  // try {
  //   const { data, status } = yield call(() =>
  //     taskService.updateTask(taskUpdateApi)
  //   );

  //   if (status === STATUS_CODE.SUCCESS) {
  //     yield put({
  //       type: "GET_PROJECT_DETAIL",
  //       projectId: taskUpdateApi.projectId,
  //     });

  //     yield put({
  //       type: GET_TASK_DETAIL_SAGA,
  //       taskId: taskUpdateApi.taskId,
  //     });
  //   }
  // } catch (err) {
  //   console.log(err.response?.data);
  //   console.log(err);
  // }
}
export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_SAGA, handleChangePostApi);
}

function* getAllComment(action) {
  const { taskId } = action;
  try {
    yield call(() => {
      taskService.getCommentTask(taskId);
    });
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: taskId,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComment);
}
function* insertComment(action) {
  const { comment } = action;

  try {
    yield call(() => {
      taskService.insertCommentTask(comment);
    });

    // yield put({
    //   type: GET_TASK_DETAIL_SAGA,
    //   taskId: comment.taskId,
    // });
    openNotificationWithIcon("success", "Comment has been added!");
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "Error!");
  }
}
export function* theoDoiInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComment);
}

function* deleteComment(action) {
  const { id, taskId } = action;

  try {
    yield call(() => {
      taskService.deleteCommentTask(id);
    });

    // yield put({
    //   type: GET_TASK_DETAIL_SAGA,
    //   taskId: taskId,
    // });
    openNotificationWithIcon("success", "Comment has been delelted!");
  } catch (error) {
    console.log(error);
    openNotificationWithIcon("error", "Error!");
  }
}
export function* theoDoiDeleteComment() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteComment);
}
function* updateComment(action) {
  const { id, contentComment, taskId } = action;
  console.log("action:", action);
  try {
    const { data, status } = yield call(() =>
      taskService.updateCommentTask(id, contentComment)
    );

    // yield put({ type: GET_TASK_DETAIL_SAGA, taskId: taskId });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateComment);
}
