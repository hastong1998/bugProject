import { GET_ALL_USER, SET_USER_EDIT } from "../constans/Cyberbugs/UserConst";

const initialState = {
  listUser: [],
  userEdit: {},
};

export const UserManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      state.listUser = action.listUser;

      return { ...state };
    case SET_USER_EDIT: {
      state.userEdit = action.userEdit;
      console.log("userEdit action", state.userEdit);
      return { ...state };
    }
    default:
      return state;
  }
};
