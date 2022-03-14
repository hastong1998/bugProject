import { useSelector } from "react-redux";
import { call, select, takeLatest } from "redux-saga/effects";
import { signUpSerVice } from "../../../services/SignUpService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
import { SIGN_UP_SAGA } from "../../constans/Cyberbugs/SignUpConst";

function* SignUpSaga(action) {
  const { signUpUser, history } = action;

  try {
    const { data, status } = yield call(() =>
      signUpSerVice.signUpSaga(signUpUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Đăng ký tài khoản thành công");
    }

    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/login");
  } catch (error) {
    openNotificationWithIcon("error", "Đăng ký thất bại");
  }
}
export function* theoDoiSignUpSaga() {
  yield takeLatest(SIGN_UP_SAGA, SignUpSaga);
}
