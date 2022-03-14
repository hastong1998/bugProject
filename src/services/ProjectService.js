import { baseService } from "./baseService";

export class PorjectService extends baseService {
  constructor() {
    super();
  }
  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };
}
export const porjectService = new PorjectService();
