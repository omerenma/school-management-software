import { combineReducers } from "redux";
import register from "./registerReducer";
import loging from "./loginReducer";
import registerProfile from "./registerProfileReducer";
import getProfile from "./profileReducer";
export default combineReducers({
  register,
  loging,
  registerProfile,
  getProfile,
});
