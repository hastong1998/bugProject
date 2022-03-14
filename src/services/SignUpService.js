import { baseService } from "./baseService";

export class SignUpSerVice extends baseService {
  constructor() {
    super();
  }
  signUpSaga = (signUpUser) => {
    return this.post(`Users/signup`, signUpUser);
  };
}
export const signUpSerVice = new SignUpSerVice();
