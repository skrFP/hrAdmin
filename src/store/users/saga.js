import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USERS, ADD_NEW_USER, DELETE_USER } from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  addUserFail,
  addUserSuccess,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  addNewUser,
  deleteUser,
} from "../../helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response.data))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response.data))
  } catch (error) {
    yield put(addUserFail(error))
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)

  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
