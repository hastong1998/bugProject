import { USER_SIGNIN_API } from "../constans/Cyberbugs/Cyberbugs";

export const signinCyberbugAction = (email, password, history) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
