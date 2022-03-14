import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Header from "./components/Home/Header/Header";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import ToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Modal from "./HOC/Modal/Modal";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { history } from "./util/libs/history";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./redux/sagas/CyberBugs/IndexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import ModalCyberBugs from "./components/Cyberbugs/Main/ModalCyberbugs/ModalCyberBugs";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";
import Notification from "./components/Notification/Notification";
import IndexCyberBugs from "./redux/sagas/CyberBugs/IndexCyberBugs";
import DemoDragDrop from "./pages/DemoDragDrop.js/DemoDragDrop";
import DragAndDropDnd from "./pages/DragAndDropDnd/DragAndDropDnd";
import SignUp from "./pages/SignUp/SignUp";
import UserManagement from "./pages/UserManagement/UserManagement";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history,
    });
  }, []);

  return (
    <>
      <DrawerCyberBugs></DrawerCyberBugs>
      <Modal></Modal>
      <LoadingComponent></LoadingComponent>
      <Switch>
        {/* <Route
          path="/home"
          render={(propsRoute) => {
            return (
              <div>
                <Header></Header>
                <Home></Home>
              </div>
            );
          }}
        /> */}
        <HomeTemplate path="/home" exact Component={Home} />
        <UserLoginTemplate path="/signup" exact Component={SignUp} />
        <UserLoginTemplate path="/login" exact Component={LoginCyberBugs} />
        <HomeTemplate path="/dragdropdnd" exact Component={DragAndDropDnd} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/dragdrop" exact Component={DemoDragDrop} />
        <HomeTemplate path="/about" exact Component={About} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <HomeTemplate path="/todolistrfc" exact Component={TodolistRFC} />
        <HomeTemplate path="/todolistrcc" exact Component={Todolist} />
        <HomeTemplate path="/todolistredux" exact Component={ToDoListRedux} />
        <HomeTemplate path="/todolistsaga" exact Component={ToDoListSaga} />
        <HomeTemplate path="/demohoc" exact Component={DemoHOCModal} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectManagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberBugs}
        />
        <UserLoginTemplate path="/" exact Component={LoginCyberBugs} />
        <CyberbugsTemplate
          path="/usermanagerment"
          exact
          Component={UserManagement}
        />
        <HomeTemplate path="*" exact Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
