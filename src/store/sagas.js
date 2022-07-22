import { all, fork } from "redux-saga/effects"

//public
import ProfileSaga from "./auth/profile/saga"
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import companysSaga from "./companys/saga"
import usersSaga from "./users/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(ProfileSaga),

    fork(LayoutSaga),
    fork(companysSaga),
    fork(usersSaga),
  ])
}
