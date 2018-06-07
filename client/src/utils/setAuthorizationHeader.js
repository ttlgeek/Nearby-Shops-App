import axios from "axios";

export const setAuthorizationHeader = token => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common.authorization = token;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};
