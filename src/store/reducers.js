import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"

//company
import companys from "./companys/reducer"
//users
import users from "./users/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Profile,
  companys,
  users,
})

export default rootReducer
