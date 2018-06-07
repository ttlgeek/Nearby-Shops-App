export const login = data => ({
  type: "USER_LOGGED_IN",
  data
});

export const logout = () => ({
  type: "USER_LOGGED_OUT"
});
