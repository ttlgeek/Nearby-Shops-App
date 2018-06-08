import axios from "axios";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      localStorage.user_id = action.data.user.id;
      localStorage.token = action.data.token;
      localStorage.user_email = action.data.user.email;
      axios.defaults.headers.common.authorization = action.data.token;
      return action.data.user;
    case "USER_LOGGED_OUT":
      localStorage.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
      axios.defaults.headers.common.authorization = null;
      return {};
    default:
      return state;
  }
}
