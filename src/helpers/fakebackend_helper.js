import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)
// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)
export const getCompanyProfile = () => get(url.GET_COMPANY_PROFILE)

// get Company
export const getCompanys = () => get(url.GET_COMPANYS)
// add COMPANY
export const addNewCompany = company => post(url.ADD_NEW_COMPANY, company)
// delete company
export const deleteCompany = id =>
  del(`${url.DELETE_COMPANY}/${id}`, { params: { id } })

// get users
export const getUsers = () => get(url.GET_USERS)
// add users
export const addNewUser = user => post(url.ADD_NEW_USER, user)
// delete user
export const deleteUser = id =>
  del(`${url.DELETE_USER}/${id}`, { params: { id } })

export { getLoggedInUser, isUserAuthenticated, postJwtLogin, postJwtProfile }
