import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import CompanyList from "pages/Company/CompanyList/CompanyList"
import CompanyPoint from "pages/Company/CompanyPoint/CompanyPoint"
import CompanyCvController from "pages/Company/CompanySettings/CompanyCvController"
import CompanySpecialController from "pages/Company/CompanySettings/CompanySpecialController"
import CompanyUrgentController from "pages/Company/CompanySettings/CompanyUrgentController"
import CompanyActive from "pages/Company/CompanyActive/CompanyActive"
import CompanyCreate from "pages/Company/CompanyRegister/CompanyCreate"
import UserList from "pages/User/UserList/UserList"
import UserVerify from "pages/User/UserVerify/UserVerify"
import UserWallet from "pages/User/UserWallet/UserWallet"
import UserCreate from "pages/User/UserCreate/UserCreate"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // Company
  { path: "/companylist", component: CompanyList },
  { path: "/companypoint", component: CompanyPoint },
  { path: "/companycvcontroller", component: CompanyCvController },
  { path: "/companyspecialcontroller", component: CompanySpecialController },
  { path: "/companyurgentcontroller", component: CompanyUrgentController },
  { path: "/companyactive", component: CompanyActive },
  { path: "/companyregister", component: CompanyCreate },
  // User
  { path: "/users", component: UserList },
  { path: "/userverify", component: UserVerify },
  { path: "/userwallet", component: UserWallet },
  { path: "/usercreate", component: UserCreate },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
