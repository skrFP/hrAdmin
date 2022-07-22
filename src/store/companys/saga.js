import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_COMPANYS,
  GET_COMPANY_PROFILE,
  ADD_NEW_COMPANY,
  DELETE_COMPANY,
} from "./actionTypes"

import {
  getCompanysSuccess,
  getCompanysFail,
  getCompanyProfileSuccess,
  getCompanyProfileFail,
  addCompanyFail,
  addCompanySuccess,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCompanys,
  getCompanyProfile,
  addNewCompany,
  deleteCompany,
} from "../../helpers/fakebackend_helper"

function* fetchCompanys() {
  try {
    const response = yield call(getCompanys)
    yield put(getCompanysSuccess(response.data))
  } catch (error) {
    yield put(getCompanysFail(error))
  }
}

function* fetchCompanyProfile() {
  try {
    const response = yield call(getCompanyProfile)
    yield put(getCompanyProfileSuccess(response))
  } catch (error) {
    yield put(getCompanyProfileFail(error))
  }
}

function* onDeleteCompany({ payload: company }) {
  try {
    const response = yield call(deleteCompany, company)
    yield put(deleteCompanySuccess(response))
  } catch (error) {
    yield put(deleteCompanyFail(error))
  }
}

function* onAddNewCompany({ payload: company }) {
  try {
    const response = yield call(addNewCompany, company)

    yield put(addCompanySuccess(response.data))

    console.log(response.data)
  } catch (error) {
    yield put(addCompanyFail(error))
    console.log(error)
  }
}

function* companysSaga() {
  yield takeEvery(GET_COMPANYS, fetchCompanys)
  yield takeEvery(GET_COMPANY_PROFILE, fetchCompanyProfile)
  yield takeEvery(ADD_NEW_COMPANY, onAddNewCompany)

  yield takeEvery(DELETE_COMPANY, onDeleteCompany)
}

export default companysSaga
