export default function shop(state = {}, action = {}) {
  switch (action.type) {
    case "ADD_ALL_SHOPS":
      console.log(action.data);
      return { nearby: action.data };
    case "ADD_SHOP":
      return { preferred: action.data };
    case "REMOVED_SHOP":
      console.log(action);
      return { preferred: action.data };
    default:
      return state;
  }
}
