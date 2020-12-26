function errorReducer(state = false, action) {
  switch (action.type) {
    case "SET_ERROR":
      return (state = true);
    case "REMOVE_ERROR":
      return (state = false);
    default:
      return state;
  }
}
export { errorReducer };
