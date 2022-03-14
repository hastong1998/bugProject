import * as ToDoListSaga from "./ToDoListSaga";
import { all } from "redux-saga/effects";
import * as Cyberbugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";
import * as SignUpSaga from "./CyberBugs/SignUpSaga";
import * as UserManagementSaga from "./CyberBugs/UserManagementSaga";
export function* rootSaga() {
  yield all([
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApiAction(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionDoneTaskApi(),
    // Nghiệp vụ cyberbugs
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProjectSaga(),
    Cyberbugs.theoDoiRemoveUserProjectSaga(),
    ProjectSaga.theoDoiGetDetailProjectSaga(),
    ProjectCategorySaga.theoDOiGetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoigetAllPrioritySaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUpdataTaskSaga(),
    TaskSaga.theoDoiGetAllComment(),
    TaskSaga.theoDoiInsertComment(),
    TaskSaga.theoDoiDeleteComment(),
    TaskSaga.theoDoiUpdateComment(),
    SignUpSaga.theoDoiSignUpSaga(),
    UserManagementSaga.theoDoiGetAllUser(),
    UserManagementSaga.theoDoiDeleteUser(),
    UserManagementSaga.theoDoiUpdateUser(),
    UserManagementSaga.theoDoiHandleUserApi(),
  ]);
}
