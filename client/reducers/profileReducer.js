function userStorageReducer(state = null, action) {
  switch (action.type) {
    case "SET_STORAGE":
      return (state = action.payload);
    default:
      return state;
  }
}

export { userStorageReducer };
