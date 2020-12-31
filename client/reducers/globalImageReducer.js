function globalImageReducer(state = "", action) {
  switch (action.type) {
    case "SET_URL":
      return (state = action.payload);
    default:
      return state;
  }
}

export { globalImageReducer };
