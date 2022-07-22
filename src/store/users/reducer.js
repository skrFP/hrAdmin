import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  error: {},
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default users
