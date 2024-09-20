import {
  call,
  all,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";

import {
  onAutenticateUser,
  onAutenticateUserSuccess,
  onAutenticateUserError,
} from "../../features/auth";
import { authLoginAPI, ApiReturnType } from "../../api";
import { LoginFormData } from "../../components/Login";

type AuthUserActionType = ReturnType<typeof onAutenticateUser> & {
  payload: LoginFormData;
};

function* authenticateUser(
  action: AuthUserActionType
): Generator<CallEffect<ApiReturnType> | PutEffect<any>, void, any> {
  try {
    const authData: ApiReturnType = yield call(authLoginAPI, {
      formData: action.payload,
    });
    yield put(onAutenticateUserSuccess(authData));
  } catch (e) {
    if (e instanceof Error) {
      yield put(onAutenticateUserError(e.message));
    } else {
      yield put(onAutenticateUserError("An unknown error occurred."));
    }
  }
}

function* authenticateUserSaga() {
  yield takeEvery(onAutenticateUser, authenticateUser);
}

function* rootSaga() {
  yield all([authenticateUserSaga()]);
}
export default rootSaga;
