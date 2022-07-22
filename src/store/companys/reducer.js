import {
  GET_COMPANYS_SUCCESS,
  GET_COMPANYS_FAIL,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  GET_COMPANY_PROFILE_SUCCESS,
  GET_COMPANY_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  companys: [],
  companyProfile: {},
  error: {},
}

const companys = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANYS_SUCCESS:
      return {
        ...state,
        companys: action.payload,
      }

    case GET_COMPANYS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        companys: [...state.companys, action.payload],
      }

    case ADD_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        companyProfile: action.payload,
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companys: state.companys.filter(
          company => company.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMPANY_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default companys
