import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }
  createTask = (taskObject) => {
    return this.post(`Project/createTask`, taskObject);
  };
  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
  getTaskUpdate = (taskStatusUpdate) => {
    return this.put(`Project/updateStatus`, taskStatusUpdate);
  };
  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
  getCommentTask = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
  insertCommentTask = (comment) => {
    return this.post(`Comment/insertComment`, comment);
  };
  deleteCommentTask = (id) => {
    return this.delete(`Comment/deleteComment?idComment=${id}`);
  };
  updateCommentTask = (id, contentComment) => {
    return this.put(
      `Comment/updateComment?id=${id}&contentComment=${contentComment}`
    );
  };
}
export const taskService = new TaskService();
