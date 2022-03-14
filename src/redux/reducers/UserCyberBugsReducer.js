import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constans/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECTID } from "../constans/Cyberbugs/UserConst";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case "GET_USER_SEARCH": {
      state.userSearch = action.lstUserSearch;

      return { ...state };
    }
    case GET_USER_BY_PROJECTID: {
      return { ...state, arrUser: action.arrUser };
    }
    default:
      return { ...state };
  }
};
