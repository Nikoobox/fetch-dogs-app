import { all } from "redux-saga/effects";

import { authenticateUserSaga, logoutUserSaga } from "./authSagas";
import { dogsSaga } from "./dogsSagas";

function* rootSaga() {
  yield all([authenticateUserSaga(), logoutUserSaga(), dogsSaga()]);
}
export default rootSaga;
