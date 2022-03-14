import Axios from "axios";
import { GET_TASK_API } from "../constans/ToDoListConst";
// //action co 2 loai
// 1 thuc thi ngay lam thay doi reducecr
// 2 action phai thuc hien xu ly roi moi goi action 1 thuc thi (async action)
export const getTaskListApi = () => {
  //Tiền xử lý dữ liệu
  return (dispatch) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};
export const addTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });

    //Xử lý thành công
    promise.then((result) => {
      // alert(result.data);
      dispatch(getTaskListApi());
    });

    //Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};
export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};
export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((res) => {
      alert(res.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((res) => {
      alert(res.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
