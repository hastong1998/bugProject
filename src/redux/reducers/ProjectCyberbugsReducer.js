import { GET_ALL_PROJECT } from "../constans/Cyberbugs/Cyberbugs";

const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "abc",
      description: '<p style="color:red"></p>',
    },
  ],
  arrProject: [],
};
export const ProjectCyberReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_PROJECT_LIST": {
      state.projectList = action.projectList;

      return { ...state };
    }

    case GET_ALL_PROJECT: {
      state.arrProject = action.arrProject;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
