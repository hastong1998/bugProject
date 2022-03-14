import { call, put, takeLatest } from "redux-saga/effects";
import { cyberbygsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  USER_SIGNIN_API,
} from "../../constans/Cyberbugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbygsService.getAllProjectCategory()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* theoDOiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
