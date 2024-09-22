import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";

import {
  onAutenticateUser,
  onAutenticateUserSuccess,
  onAutenticateUserError,
  onLogoutUser,
  onLogoutUserSuccess,
  onLogoutUserError,
} from "../../features/auth";
import { authLoginAPI, ApiReturnType, authLogoutAPI } from "../../api";
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

function* logoutUser(): Generator<
  CallEffect<boolean> | PutEffect<any>,
  void,
  any
> {
  try {
    const success: boolean = yield call(authLogoutAPI);
    if (success) {
      yield put(onLogoutUserSuccess());
    } else {
      yield put(onLogoutUserError("Logout failed."));
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(onLogoutUserError(e.message));
    } else {
      yield put(onLogoutUserError("An unknown error occurred."));
    }
  }
}

function* authenticateUserSaga() {
  yield takeEvery(onAutenticateUser, authenticateUser);
}

function* logoutUserSaga() {
  yield takeEvery(onLogoutUser, logoutUser);
}

export { authenticateUserSaga, logoutUserSaga };
