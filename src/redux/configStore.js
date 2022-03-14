import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
//middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducers/LoadingReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectCyberReducer } from "./reducers/ProjectCyberbugsReducer";
import { DrawerReducer } from "./reducers/DrawCyberBugsReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { TaskDetailModel } from "./reducers/TaskReducer";
import { UserManagementReducer } from "./reducers/UserManagementReducer";
const middleWareSaga = createMiddleWareSaga();

const rootReuducer = combineReducers({
  ToDoListReducer,
  LoadingReducer,
  ModalReducer,
  HistoryReducer,
  UserLoginCyberBugsReducer,
  ProjectCategoryReducer,
  ProjectCyberReducer,
  DrawerReducer,
  ProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskDetailModel,
  UserManagementReducer,
});

const store = createStore(
  rootReuducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);
middleWareSaga.run(rootSaga);
export default store;
