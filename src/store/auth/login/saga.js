import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

import { postJwtLogin } from "../../../helpers/fakebackend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      phone: user.phone,
      password: user.password,
    })
    localStorage.setItem("authUser", JSON.stringify(response))
    const token = response.token
    localStorage.setItem("token", token)
    console.log(response.token)
    yield put(loginSuccess(response))
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("token")

    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)

  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
