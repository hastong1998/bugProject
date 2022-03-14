import axios from "axios";
import { DOMAIN } from "../util/constants/settingSystem";
export class ToDoListServiec {
  constructor() {}
  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };
  addTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };
  deleteTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  };
  doneTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
  };
}
export const toDoListService = new ToDoListServiec();
