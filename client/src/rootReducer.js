import user from "./reducers/user";
import shop from "./reducers/shop";
import { combineReducers } from "redux";

export default combineReducers({
  user,
  shop
});
