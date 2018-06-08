export default function shop(state = {}, action = {}) {
  switch (action.type) {
    case "ADD_ALL_SHOPS":
      return { nearby: action.data };
    case "ADD_SHOP":
      return { preferred: action.data };
    case "REMOVED_SHOP":
      return { preferred: action.data };
    default:
      return state;
  }
}
